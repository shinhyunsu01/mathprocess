import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";
import client from "../../../libs/server/client";
import { withIronSessionApiRoute } from "iron-session/next/dist";
import { withApiSession } from "../../../libs/server/withSession";

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseType>
) {
	const { name, payload, school, grade } = req.body;
	let user;
	if (req.method === "POST") {
		if (name && payload) {
			user = await client.user.findFirst({
				where: {
					name,
					payload,
				},
			});
			if (user) {
				req.session.user = {
					id: user.id,
				};
				await req.session.save();

				//if (req.session.user) {
				res.json({
					ok: true,
					user,
				});
				//}
			} else {
				res.json({
					ok: false,
				});
			}
		} else if (name) {
			const payload = Math.floor(100000 + Math.random() * 900000) + "";
			user = await client.user.create({
				data: {
					name,
					payload,
					school,
					student: "student",
					grade: Number(grade),
				},
			});
			res.json({
				ok: true,
				user,
			});
		}
	}
}

export default withApiSession(
	withHandler({ methods: ["POST"], handler, isPrivate: false })
);
