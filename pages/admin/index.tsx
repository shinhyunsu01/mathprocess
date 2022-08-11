import React, { useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Students from "../../components/Students";
import dynamic from "next/dynamic";
import useUser from "../../libs/client/useUser";
import { Router } from "express";
import { useRouter } from "next/router";
import useSWR from "swr";
import { User } from ".prisma/client";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
interface UserType {
	ok: boolean;
	userInfo: User;
}
const Admin = () => {
	const { user, isLoading } = useUser();
	const router = useRouter();
	useEffect(() => {
		if (user && user.student !== "teacher") {
			router.replace("/");
		}
	}, [user, isLoading]);
	return (
		<div className="flex w-full h-full">
			<Sidebar />
			<Students />
			<div className="w-full"></div>
		</div>
	);
};

export default Admin;
/*

<ApexChart
					type="donut"
					series={[44, 55, 41, 17]}
					options={{
						chart: {
							height: "100%",
							width: "100%",
						},
						responsive: [
							{
								options: {
									chart: {
										width: 200,
									},
									legend: {
										position: "bottom",
									},
								},
							},
						],
					}}
				/>
*/
