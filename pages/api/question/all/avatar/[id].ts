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
	let allAvatar;

	if (req.method === "GET") {
		allAvatar = await client.questions.findFirst({
			where: {
				id: Number(req.query.id),
			},
		});
		let question = allAvatar?.question?.split(",");
		let selectquestion: any[""] = allAvatar?.selectQuestion?.split(",");
		//console.log("selectquestion", selectquestion);
		let result: any[] = [];
		if (question && selectquestion) {
			result = await Promise.all(
				question.map(async (data, i) => {
					const res = await client.questionDB.findFirst({
						where: {
							id: Number(data),
						},
						select: {
							avatar: true,
							answer: true,
						},
					});

					return { ...res, select: Number(selectquestion[i]) };
				})
			);

			res.json({
				ok: true,
				allQues: result,
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
