import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseType>
) {
	const response = await (
		await fetch(
			`https://api.cloudflare.com/client/v4/accounts/${process.env.NEXT_PUBLIC_CF_ID}/images/v2/direct_upload`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${process.env.NEXT_PUBLIC_CF_TOKEN}`,
				},
			}
		)
	).json();

	res.json({
		ok: true,
		...response.result,
	});
}

export default withHandler({
	methods: ["GET", "POST"],
	handler,
});
