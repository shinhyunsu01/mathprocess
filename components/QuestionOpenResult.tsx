import Image from "next/image";
import React from "react";

interface showType {
	state: any;
	handler: () => void;
}
const QuestionOpenResult = ({ handler, state }: showType) => {
	console.log(state);
	return (
		<div className=" fixed bg-opacity-70 bg-white z-20 top-0 w-full h-full flex items-center justify-center">
			<div className="w-96 h-96 items-center relative z-20  rounded-2xl bg-white shadow-lg shadow-slate-400  flex flex-col">
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
				<div className="w-30 h-30  flex flex-col mt-auto">
					<div className=" h-full w-full">
						<Image
							layout="fill"
							objectFit="contain"
							src={`https://imagedelivery.net/fhkogDoSTeLvyDALpsIbnw/${state.avatar}/public`}
						/>
					</div>
					<div className="text-red-500 m-2">
						오답 : <span>{state.select}</span>
					</div>
					<div className="text-green-500 m-2">
						정답 : <span>{state.answer}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default QuestionOpenResult;
