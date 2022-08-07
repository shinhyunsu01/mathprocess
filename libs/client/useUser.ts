import { User } from ".prisma/client";
import { useRouter } from "next/router";

import { useEffect } from "react";
import useSWR from "swr";

interface UserType {
	ok: boolean;
	userInfo: User;
}

export default function useUser(student: string) {
	const { data, error } = useSWR<UserType>("api/users");
	const router = useRouter();
	useEffect(() => {
		if (data && !data.ok && data?.userInfo?.student !== student) {
			router.replace("/enter");
		}
	}, [data, router]);
	return { user: data?.userInfo, isLoading: !data && !error };
}
