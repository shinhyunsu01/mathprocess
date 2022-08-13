import React from "react";

interface showType {
	name: string;
	handler: () => void;
}
const ShowInitMessage = ({ handler, name }: showType) => {
	return (
		<div className="w-full absolute z-50 h-full bg-white  flex items-center justify-center flex-col">
			<div className=" p-4 bg-white rounded-2xl  border-2 flex items-center  flex-col justify-center">
				<span className="font-bold">
					{name}
					<span>학생</span>
				</span>

				<div className=" ">시험 문제 도착했습니다 🔔</div>
				<div className="text-sm text-black opacity-50">
					#버튼 누르면 시험이 시작 됩니다
				</div>
				<br></br>
				<button
					className="px-5 py-2 bg-black rounded-lg flex text-white"
					onClick={handler}
				>
					<div>도전!</div>
				</button>
			</div>
		</div>
	);
};

export default ShowInitMessage;
