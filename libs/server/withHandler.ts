import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
	ok: boolean;
	[key: string]: any;
}

type method = "GET" | "POST" | "DELETE";
interface ConfigType {
	methods: method[];

	handler: (req: NextApiRequest, res: NextApiResponse) => void;
	isPrivate?: boolean;
}

export default function withHandler({
	methods,
	handler,
	isPrivate = false,
}: ConfigType) {
	return async function (
		req: NextApiRequest,
		res: NextApiResponse
	): Promise<any> {
		if (req.method && !methods.includes(req.method as any)) {
			console.log("error1");
			return res.status(405).end();
		}

		if (isPrivate && !req.session.user) {
			console.log("error2");
			return res.status(401).json({ ok: false, error: "plz log in" });
		}
		try {
			await handler(req, res);
		} catch (error) {
			console.log("error");
			return res.status(500).json({ error });
		}
	};
}
