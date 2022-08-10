import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";
import client from "../../../libs/server/client";
import { withApiSession } from "../../../libs/server/withSession";

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseType>
) {
	const {
		session: { user },
	} = req;
	let manyquestion;

	if (req.method === "GET") {
		console.log("get");
		manyquestion = await client.questions.findMany({
			where: {
				userId: user?.id,
				qnasubmit: true,
			},
		});
		console.log(manyquestion);
	}

	res.json({
		ok: true,
		manyquestion,
	});
}

export default withApiSession(
	withHandler({
		methods: ["GET", "POST"],
		handler,
	})
);
