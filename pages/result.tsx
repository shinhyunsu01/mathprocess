import React, { useEffect } from "react";
import useSWR from "swr";

const Result = () => {
	const { data } = useSWR("/api/question/resultquestion");
	useEffect(() => {
		console.log("data", data);
	}, [data]);
	return (
		<div className="w-full flex ">
			<div className=" fixed z-20 top-2 left-20 w-full flex items-center ">
				{data?.manyquestion.map((e: any) => (
					<button className="flex flex-col shadow-lg shadow-slate-400 hover:text-black  hover:outline hover:bg-white bg-black rounded-2xl items-center text-white p-2 mr-5">
						<div> 시험 종료 날짜</div>
						<div className="text-blue-300 text-sm ">
							{e.updatedAt.slice(0, 10)}
						</div>
					</button>
				))}
			</div>
			<div className=" pt-20 flex flex-col w-14 h-screen bg-white border-r-2 border-slate-400 items-center">
				<div className="font-bold">문제</div>
				<br></br>
			</div>
		</div>
	);
};

export default Result;
/*

	<div className=" pt-20 flex flex-col w-14 h-screen bg-white border-r-2 border-slate-400 items-center">
				<div className="font-bold">문제</div>
				<br></br>
			</div>
*/
