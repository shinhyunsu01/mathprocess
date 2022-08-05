import React from "react";

const Students = () => {
	return (
		<div className="border-r w-48 flex flex-col border-r-gray-300 h-screen overflow-auto ">
			{[
				11, 1, 1, 1, 1, 11, 1, 11, 1, 1, 1, 1, 11, 1, 11, 1, 1, 1, 1, 11, 1, 11,
				1, 1, 1, 1, 11, 1, 11, 1, 1, 1, 1, 11, 1,
			].map((_, i) => (
				<div
					key={i}
					className="flex w-full items-center hover:bg-cyan-200 rounded-lg cursor-pointer"
				>
					<div className="flex flex-col m-2 ">
						<div className=" font-bold text-sm">김민수</div>
						<div className=" font-normal text-sm text-slate-400">
							서신고등학교 1학년
						</div>
					</div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
					</svg>
				</div>
			))}
		</div>
	);
};

export default Students;
