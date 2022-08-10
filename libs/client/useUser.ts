import { User } from ".prisma/client";
import { useRouter } from "next/router";

import { useEffect } from "react";
import useSWR from "swr";

interface UserType {
	ok: boolean;
	userInfo: User;
}

export default function useUser(student: string) {
	const { data, error } = useSWR<UserType>("/api/users");
	const router = useRouter();

	useEffect(() => {
		if (data && !data.ok) {
			console.log("check point 1");
			router.replace("/enter");
		} else if (data && data.userInfo && data?.userInfo?.student !== student) {
			console.log("check point 2");
			router.replace("/enter");
		}
	}, [data, router]);
	return { user: data?.userInfo, isLoading: !data && !error };
}
