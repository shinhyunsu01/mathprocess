import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useMutation from "../libs/client/useMutation";

interface EditModalType {
	handler: any;
	state: any;
	setstate: any;
}

interface editTypes {
	grade: string;
	school: string;
	name: string;
}
const EditModal = ({ handler, state, setstate }: EditModalType) => {
	const router = useRouter();
	const { register, handleSubmit } = useForm<editTypes>();
	const [editFn, { data }] = useMutation("/api/user");
	const onValid = ({ grade, school, name }: editTypes) => {
		editFn({ grade, school, name, id: state.id });
	};
	useEffect(() => {
		if (data?.ok) {
			handler();
			router.reload();
		}
	}, [data]);
	return (
		<div className=" fixed z-50 top-0 w-full h-full flex items-center justify-center">
			<form
				onSubmit={handleSubmit(onValid)}
				className="w-80 h-80 items-center relative z-20 p-4 rounded-2xl bg-white shadow-lg shadow-slate-400  flex flex-col"
			>
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
				<label className="block w-5/6">
					<span className="block text-sm font-medium  text-slate-700 after:content-['*'] after:ml-0.5 after:text-red-500">
						Username
					</span>
					<input
						{...register("name")}
						placeholder={state.name}
						defaultValue={state.name}
						type="text"
						className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-sky-500"
					></input>
				</label>

				<label className="block w-5/6">
					<span className="block text-sm font-medium  text-slate-700 after:content-['*'] after:ml-0.5 after:text-red-500">
						학교
					</span>
					<input
						{...register("school")}
						placeholder={state.school}
						defaultValue={state.school}
						type="text"
						className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-sky-500"
					></input>
				</label>
				<label className="block w-5/6">
					<span className="block text-sm font-medium  text-slate-700 after:content-['*'] after:ml-0.5 after:text-red-500">
						학년
					</span>
					<input
						{...register("grade")}
						placeholder={state.grade}
						defaultValue={state.grade}
						type="text"
						className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-sky-500"
					></input>
				</label>
				<div className="flex w-full">
					<button
						type="submit"
						className=" w-full mx-2 py-2 bg-black mt-4 text-white rounded-2xl hover:text-sky-500"
					>
						저장
					</button>
					<div className="cursor-pointer text-center w-full mx-2 py-2 bg-black mt-4 text-red-300 rounded-2xl hover:text-sky-500">
						DB 삭제
					</div>
				</div>
			</form>
		</div>
	);
};

export default EditModal;
