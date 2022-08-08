import React from "react";
import { useForm } from "react-hook-form";
import useMutation from "../libs/client/useMutation";

interface ErrorModalType {
	handler: () => void;
	message: string;
}
const ErrorModal = ({ handler, message }: ErrorModalType) => {
	return (
		<div className="  absolute top-0 w-full h-full flex items-center justify-center">
			<div className="w-60 h-60 relative p-4 rounded-2xl bg-white shadow-lg shadow-slate-400 items-center justify-center flex ">
				<div className="absolute top-2 right-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 top-0 right-0 cursor-pointer"
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
				</div>
				<div className="text-lg font-bold">{message}</div>
			</div>
		</div>
	);
};

export default ErrorModal;
