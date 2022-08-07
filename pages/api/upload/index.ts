import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";
import client from "../../../libs/server/client";

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseType>
) {
	const {
		body: { grade, kind, answer, avatar, minititle, difficulty },
	} = req;
	let upload;

	if (req.method === "POST") {
		console.log("api post", req.body);
		upload = await client.questionDB.create({
			data: {
				grade: Number(grade),
				kind,
				answer: Number(answer),
				avatar,
				minititle,
				difficulty: Number(difficulty),
			},
		});
		console.log("apiupload", upload);
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
