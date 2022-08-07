import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";
import client from "../../../libs/server/client";
import { withApiSession } from "../../../libs/server/withSession";
/*
declare module "iron-session" {
	interface IronSessionData {
		user?: {
			id: number;
		};
	}
}
*/
async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseType>
) {
	const {
		session: { user },
	} = req;
	let userInfo;
	if (req.method === "GET") {
		if (!user) {
			res.json({
				ok: false,
			});
		} else {
			userInfo = await client.user.findUnique({
				where: {
					id: user?.id,
				},
			});
			res.json({
				ok: true,
				userInfo,
			});
		}
	}
}

export default withApiSession(
	withHandler({
		methods: ["GET", "POST"],
		handler,
	})
);
