import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";
import client from "../../../libs/server/client";

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseType>
) {
	const {
		body: { grade, kind, answer, avatar, minititle },
	} = req;
	let upload;

	if (req.method === "POST") {
		upload = await client.question.create({
			data: {
				grade: Number(grade),
				kind,
				answer: Number(answer),
				avatar,
				minititle,
			},
		});
	}

	res.json({
		ok: true,
		upload,
	});
}

export default withHandler({
	methods: ["GET", "POST"],
	handler,
});
