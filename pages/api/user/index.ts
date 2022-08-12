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
		body: { id, name, school, grade },
	} = req;

	if (req.method === "POST") {
		const userInfo = await client.user.update({
			where: {
				id,
			},
			data: {
				name,
				school,
				grade: Number(grade),
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
