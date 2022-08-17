import { Router } from "express";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useMutation from "../libs/client/useMutation";

interface WarningModalType {
	handler: any;
}

const WarningModal = ({ handler }: WarningModalType) => {
	console.log("wraning");
	const [solveFn, { data }] = useMutation("/api/users/solve");
	const router = useRouter();
	const [state, setState] = useState(false);
	const qnasubmitonClick = (e: any) => {
		setState(true);
		e.preventDefault();
		console.log("click");
		solveFn({ qnasubmit: true });
	};
	useEffect(() => {
		if (data?.ok) {
			router.push("/result");
		}
	}, [data]);
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
					<div className="z-20 font-bold text-xl">안 푼 문제가 있습니다 </div>
					<div className="text-lg">제출 할까요? 🤔</div>
				</div>
				<br></br>
				<br></br>
				<div className="flex justify-center">
					<button
						onClick={qnasubmitonClick}
						className="hover:bg-white group e hover:text-black border-2  border-transparent hover:border-2 hover:border-black  px-4 py-2 mr-2 bg-black text-white rounded-2xl ml-auto text-center"
					>
						<div className="flex">
							{state ? (
								<svg
									className="animate-spin -ml-1 mr-3 h-5 w-5 text-white  group-hover:text-black"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
										className="opacity-25 "
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									></circle>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									></path>
								</svg>
							) : (
								""
							)}
							<div>전송</div>
						</div>
					</button>
					<button
						onClick={handler}
						className="hover:bg-white e hover:text-black border-2  border-transparent hover:border-2 hover:border-black  px-2 py-2 mr-2 bg-black text-white rounded-2xl ml-auto text-center"
					>
						아직! 확인 해볼게요
					</button>
				</div>
			</div>
		</div>
	);
};

export default WarningModal;
