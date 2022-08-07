import React from "react";
import Sidebar from "../../components/Sidebar";
import Students from "../../components/Students";
import dynamic from "next/dynamic";
import useUser from "../../libs/client/useUser";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const UserId = () => {
	const { user, isLoading } = useUser("teacher");
	return (
		<div className="flex w-full">
			<Sidebar />
			<Students />
			<div className="">
				<ApexChart
					type="radialBar"
					series={[44, 55, 67, 100]}
					options={{
						chart: {
							height: 350,
						},

						labels: ["Apples", "Oranges", "Bananas", "Berries"],
					}}
				/>
			</div>
		</div>
	);
};

export default UserId;
