import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";
import client from "../../../libs/server/client";

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseType>
) {
	const {} = req;
	let alonequestion;

	if (req.method === "GET") {
		alonequestion = await client.questionDB.findFirst({
			where: {
				id: Number(req.query.id),
			},
		});
	}

	res.json({
		ok: true,
		alonequestion,
	});
}

export default withHandler({
	methods: ["GET", "POST"],
	handler,
});
