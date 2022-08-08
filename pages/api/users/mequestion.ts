import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";
import client from "../../../libs/server/client";
import { Router } from "express";

interface Obj {
	[key: string]: any;
}

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseType>
) {
	const {
		body: {},
		session: { user },
	} = req;

	if (req.method === "GET") {
		console.log("get");
		const mequestion = await client.questions.findFirst({
			where: {
				userId: Number(user?.id),
				qnasubmit: false,
			},
		});
		res.json({
			ok: true,
			mequestion,
		});
	}
	/*if (req.method === "POST") {
		res.json({
			ok: true,
		});
	}*/
}

export default withHandler({
	methods: ["GET", "POST"],
	handler,
});
