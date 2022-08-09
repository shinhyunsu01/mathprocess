import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../../libs/server/withHandler";
import client from "../../../../libs/server/client";
import { Router } from "express";

interface Obj {
	[key: string]: any;
}

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseType>
) {
	const {
		body: { allquestion },
	} = req;

	let canQuestions: any = [];

	if (req.method === "GET") {
		let canQuestion;
		const user = await client.user.findUnique({
			where: {
				id: Number(req.query.id),
			},
		});

		canQuestion = await client.questionDB.findMany({
			where: {
				grade: Number(user?.grade),
			},
		});

		//문제key 로 obj 생성
		const group: Obj = {};
		canQuestion.map((ee) => {
			if (Object.keys(group).includes(ee.kind)) {
				group[ee.kind] = [...group[ee.kind], ee];
			} else {
				group[ee.kind] = [ee];
			}
		});

		//내 점수 obj
		if (user?.score === null || user?.score === "") {
			let str = "";
			Object.keys(group).map((e) => {
				str += `${e}_3,`;
			});
			str = str.slice(0, -1);

			await client.user.update({
				where: {
					id: Number(req.query.id),
				},
				data: {
					score: str,
				},
			});
			user.score = str;
		}
		const myScore: Obj = {};
		user?.score.split(",").map((e) => {
			let data = e.split("_");
			myScore[data[0]] = Number(data[1]);
		});

		//MAkE
		Object.keys(group).map((key) => {
			let nowPosGrade = myScore[key];

			//시험 문제로 할수 있는지...
			group[key].map((ques: any) => {
				if (+ques.difficulty === nowPosGrade) {
					canQuestions.push(ques);
				}
			});
		});

		res.json({
			ok: true,
			canQuestions,
		});
	}
	if (req.method === "POST") {
		//console.log("post", allquestion, allquestion.toString());
		/*
		await client.questions.create({
			data: {
				qnasubmit: false,
				question: allquestion.toString(),

				user: {
					connect: {
						id: Number(req.query.id),
					},
				},
			},
		});*/

		res.json({
			ok: true,
		});
	}
}

export default withHandler({
	methods: ["GET", "POST"],
	handler,
});
