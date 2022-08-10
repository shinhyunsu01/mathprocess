import React from "react";

interface WarningModalType {
	handler: any;
}

const WarningModal = ({ handler }: WarningModalType) => {
	return (
		<div className=" fixed bg-opacity-70 bg-white z-20 top-0 w-full h-full flex items-center justify-center">
			<div className=" items-center relative z-20 p-4 rounded-2xl bg-white shadow-lg shadow-slate-400  flex flex-col">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="z-10 absolute h-6 w-6 ml-auto top-2 right-2 cursor-pointer"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth="2"
					onClick={handler}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
				<div className="flex flex-col items-center justify-center">
					<div className="font-bold text-xl">안 푼 문제가 있습니다 </div>
					<div className="text-lg">제출 할까요? 🤔</div>
				</div>
				<br></br>
				<br></br>
				<div className="flex justify-center">
					<button className="hover:bg-white hover:text-black hover:outline px-6 py-2 mr-2 bg-black text-white rounded-2xl ml-auto text-center">
						전송
					</button>
					<button
						onClick={handler}
						className="hover:bg-white hover:text-black hover:outline px-6 py-2 mr-2 bg-black text-white rounded-2xl ml-auto text-center"
					>
						아직! 확인 해볼게요
					</button>
				</div>
			</div>
		</div>
	);
};

export default WarningModal;
