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
		let kindFlag = await client.questionDB.findMany({
			where: {
				kind,
			},
		});
		if (kindFlag.length === 0) {
			let newUser = await client.user.findMany({
				where: {
					grade: Number(grade),
				},
			});

			newUser?.map(async (data: any) => {
				let score = data.score + `,${kind}_3`;
				await client.user.update({
					where: {
						id: data.id,
					},
					data: {
						score,
					},
				});
			});
		}

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
