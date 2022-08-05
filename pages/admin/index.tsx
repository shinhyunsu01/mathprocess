import React from "react";
import Sidebar from "../../components/Sidebar";
import Students from "../../components/Students";

const Admin = () => {
	return (
		<div className="flex w-full">
			<Sidebar />
			<Students />
			<div className="w-full"> </div>
		</div>
	);
};

export default Admin;
