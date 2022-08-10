import React, { useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Students from "../../components/Students";
import dynamic from "next/dynamic";
import useUser from "../../libs/client/useUser";
import { Router } from "express";
import { useRouter } from "next/router";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Admin = () => {
	const { user, isLoading } = useUser();
	const router = useRouter();
	useEffect(() => {
		if (user?.student !== "teacher") {
			router.replace("enter");
		}
	}, [user]);
	console.log("admin ok", user);
	return (
		<div className="flex w-full">
			<Sidebar />
			<Students />
			<div>
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
			</div>
		</div>
	);
};

export default Admin;
