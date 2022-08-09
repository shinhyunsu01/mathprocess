import React from "react";
import { useForm } from "react-hook-form";
import useMutation from "../libs/client/useMutation";

interface addModalType {
	handler: any;
	mutate: any;
}
interface addType {
	name: string;
	school: string;
	grade: number;
}

const AddStudentModal = ({ handler, mutate }: addModalType) => {
	const { register, handleSubmit } = useForm<addType>();
	const [addFn, { data, loading }] = useMutation("/api/users/enter");
	const onValid = ({ name, school, grade }: addType) => {
		mutate(
			(prev: any) =>
				prev && {
					...prev,
					usersInfo: [
						...prev.usersInfo,
						{
							name,
							school,
							grade,
						},
					],
				}
		);
		addFn({ name, school, grade });
	};

	return (
		<div className="z-20 absolute w-full h-full flex items-center justify-center">
			<form
				onSubmit={handleSubmit(onValid)}
				className="flex flex-col items-center justify-center rounded-2xl p-4 bg-slate-200"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6 ml-auto relative cursor-pointer"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth="2"
					onClick={() => handler(false)}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>

				<label className="block w-5/6">
					<span className="block text-sm font-medium text-slate-700 after:content-['*'] after:ml-0.5 after:text-red-500">
						이름
					</span>
					<input
						{...register("name", {
							required: "이름을 입력 해주세요",
						})}
						required
						type="text"
						className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
focus:outline-none focus:border-sky-500 focus:ring-sky-500"
					></input>
				</label>
				<label className="block w-5/6">
					<span className="block text-sm font-medium text-slate-700 after:content-['*'] after:ml-0.5 after:text-red-500">
						학교
					</span>
					<input
						{...register("school", {
							required: "학교를 입력 해주세요",
						})}
						required
						type="text"
						className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
focus:outline-none focus:border-sky-500 focus:ring-sky-500"
					></input>
				</label>
				<label className="block w-5/6">
					<span className="block text-sm font-medium text-slate-700 after:content-['*'] after:ml-0.5 after:text-red-500">
						학년
					</span>
					<input
						{...register("grade", {
							required: "학년을 입력 해주세요",
						})}
						required
						type="number"
						className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
focus:outline-none focus:border-sky-500 focus:ring-sky-500"
					></input>
				</label>

				<button className=" w-5/6 Spx-8 py-2 bg-black mt-4 text-white rounded-full hover:text-sky-500">
					{loading ? "Loadubg" : "Add"}
				</button>
			</form>
		</div>
	);
};

export default AddStudentModal;
