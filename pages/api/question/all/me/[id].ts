import { NextApiRequest, NextApiResponse } from "next";
import withHandler, {
	ResponseType,
} from "../../../../../libs/server/withHandler";
import client from "../../../../../libs/server/client";
import { withApiSession } from "../../../../../libs/server/withSession";

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseType>
) {
	const {
		session: { user },
		body: {},
	} = req;
	let all;

	if (req.method === "GET") {
		all = await client.questions.findMany({
			where: {
				userId: Number(req?.query?.id),
				qnasubmit: true,
			},
		});
	}

	res.json({
		ok: true,
		all,
	});
}

export default withApiSession(
	withHandler({
		methods: ["GET", "POST"],
		handler,
	})
);
