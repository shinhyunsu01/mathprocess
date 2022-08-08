import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../../libs/server/withHandler";
import client from "../../../../libs/server/client";
import { withApiSession } from "../../../../libs/server/withSession";

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseType>
) {
	let userInfo;
	if (req.method === "GET") {
		userInfo = await client.user.findUnique({
			where: {
				id: Number(req.query.id),
			},
		});

		res.json({
			ok: true,
			userInfo,
		});
	}
}

export default withApiSession(
	withHandler({
		methods: ["GET", "POST"],
		handler,
	})
);
