import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";
import client from "../../../libs/server/client";
import { withApiSession } from "../../../libs/server/withSession";
import { cli } from "webpack-dev-server";

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
	}
	if (req.method === "POST") {
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
		}
		if (qnasubmit) {
			console.log("ok");
			mequestion = await client.questions.update({
				where: {
					id: questionfind?.id,
				},
				data: {
					qnasubmit,
				},
			});
		}
	}
	res.json({
		ok: true,
		mequestion,
	});
}

export default withApiSession(
	withHandler({
		methods: ["GET", "POST"],
		handler,
	})
);
