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
	let usersInfo;
	if (req.method === "GET") {
		usersInfo = await client.user.findMany({
			where: {
				student: {
					not: "teacher",
				},
			},
			select: {
				name: true,
				grade: true,
				school: true,
				qnasubmit: true,
				id: true,
			},
		});
	}

	res.json({
		ok: true,
		usersInfo,
	});
}

export default withApiSession(
	withHandler({
		methods: ["GET", "POST"],
		handler,
	})
);
