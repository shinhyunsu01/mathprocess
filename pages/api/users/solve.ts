import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";
import client from "../../../libs/server/client";
import { withApiSession } from "../../../libs/server/withSession";

interface Obj {
	[key: string]: any;
}

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseType>
) {
	const {
		body: { show, selectNum, index, qnasubmit },
		session: { user },
	} = req;
	let mequestion;
	if (req.method === "GET") {
		mequestion = await client.questions.findFirst({
			where: {
				userId: Number(user?.id),
				qnasubmit: false,
			},
		});
		console.log("getmequestion", mequestion);
		res.json({
			ok: true,
			mequestion,
		});
	}
	if (req.method === "POST") {
		console.log("req", req.body);
		let questionfind = await client.questions.findFirst({
			where: {
				userId: Number(user?.id),
				qnasubmit: false,
			},
		});

		if (show) {
			mequestion = await client.questions.update({
				where: {
					id: questionfind?.id,
				},
				data: {
					show: true,
				},
			});
			res.json({
				ok: true,
				mequestion,
			});
		}
		if (selectNum !== null && index != null) {
			if (questionfind?.selectQuestion) {
				const arr = questionfind?.selectQuestion?.split(",");
				arr[index] = selectNum;

				await client.questions.update({
					where: {
						id: questionfind?.id,
					},
					data: { selectQuestion: arr.toString() },
				});
			}
			res.json({
				ok: true,
			});
		}

		if (qnasubmit === true) {
			const finduser = await client.user.findUnique({
				where: {
					id: Number(user?.id),
				},
			});
			console.log("finduser", finduser);
			if (
				questionfind?.answer &&
				questionfind.selectQuestion &&
				questionfind.question &&
				finduser
			) {
				console.log("first");
				//let allscore = "";
				let score = finduser.score?.split(",");
				let answer = questionfind.answer?.split(",");
				let select = questionfind.selectQuestion.split(",");
				let question = questionfind.question.split(",");

				const allquestion = await Promise.all(
					question.map(async (data) => {
						const res = await client.questionDB.findFirst({
							where: {
								id: Number(data),
							},
							select: {
								id: true,
								kind: true,
								answer: true,
							},
						});
						return res;
					})
				);
				console.log("second");
				const allscore = score?.map((data, i) => {
					let my = data.split("_");
					let kind = my[0];
					let grade = Number(my[1]);

					const filter: any = allquestion.filter(
						(data: any) => data.kind === kind
					);

					question.map((ee, ii) => {
						if (Number(ee) === filter[0].id) {
							if (select[ii] !== answer[ii]) {
								grade = grade - 1;
							} else {
								grade = grade + 1;
							}
						}
					});

					return kind + "_" + grade + ",";
					//allscore += kind + "_" + grade + ",";
					//console.log("allscore", allscore);
				});
				console.log("fifth", allscore?.toString);
				/*if (allscore !== "") {
					allscore = allscore.slice(0, -1);

					console.log("allscore", allscore);

					console.log("score", allscore);
					await client.user.update({
						where: {
							id: Number(user?.id),
						},
						data: {
							score: allscore,
							qnasubmit: false,
						},
					});
					console.log("qnasubmit", qnasubmit);
					mequestion = await client.questions.update({
						where: {
							id: questionfind?.id,
						},
						data: {
							qnasubmit: true,
						},
					});*/
				res.json({
					ok: true,
					mequestion,
				});
			}
		}
	}
}

export default withApiSession(
	withHandler({
		methods: ["GET", "POST"],
		handler,
	})
);
