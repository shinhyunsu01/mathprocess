import { User } from ".prisma/client";
import { useRouter } from "next/router";

import { useEffect } from "react";
import useSWR from "swr";

interface UserType {
	ok: boolean;
	userInfo: User;
}

export default function useUser() {
	const { data, error, mutate } = useSWR<UserType>("/api/users");
	const router = useRouter();

	useEffect(() => {
		//console.log("c ", data);
		if (!data && !error) {
			console.log("check point 1", data, "|");
			router.replace("/enter");
		}
		/*else if (data && data.userInfo && data?.userInfo?.student !== student) {
			console.log("check point 2");
			router.replace("/enter");
		}*/
	}, [data, router, error]);
	return { user: data?.userInfo, isLoading: !data && !error };

	/*console.log("jjj", data?.userInfo?.student);
	if (data?.userInfo?.student !== student) {
		router.replace("/enter");
	}*/
}
