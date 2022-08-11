import { User } from ".prisma/client";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import useSWR from "swr";

interface UserType {
	ok: boolean;
	userInfo: User;
}

export default function useUser() {
	//const fetcher = url: => fetch(url).then((r) => r.json());
	const { data, error, mutate } = useSWR("/api/users", {
		refreshInterval: 100,
	});
	const router = useRouter();
	useEffect(() => {
		if (data && !data.ok) {
			router.replace("/enter");
		}
	}, [data, router]);

	return { user: data?.userInfo, isLoading: !data && !error };

	/*console.log("jjj", data?.userInfo?.student);
	if (data?.userInfo?.student !== student) {
		router.replace("/enter");
	}*/
}
