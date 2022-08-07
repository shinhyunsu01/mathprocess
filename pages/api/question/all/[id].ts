import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../../libs/server/withHandler";
import client from "../../../../libs/server/client";

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseType>
) {
	const {} = req;
	let all;

	if (req.method === "GET") {
		all = await client.questionDB.findMany({
			where: {
				grade: Number(req.query.id),
			},
		});
	}

	res.json({
		ok: true,
		all,
	});
}

export default withHandler({
	methods: ["GET", "POST"],
	handler,
});
