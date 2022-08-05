import React from "react";
import { useForm } from "react-hook-form";

interface enterTypes {
	username: string;
	password: string;
}
const Enter = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<enterTypes>();

	const onValid = ({ username, password }: enterTypes) => {};

	return (
		<div className="flex w-full h-screen items-center justify-center">
			<form
				onSubmit={handleSubmit(onValid)}
				className="absolute flex flex-col w-96 h-96 border-slate-300 border  rounded-md  justify-center items-center "
			>
				<div className="p-2 bg-black text-white rounded-full">
					최선생 수학 문제
				</div>
				<label className="block w-5/6">
					<span className="block text-sm font-medium  text-slate-700 after:content-['*'] after:ml-0.5 after:text-red-500">
						Username
					</span>
					<input
						{...register("username", {
							required: "username 입력 해주세요",
						})}
						required
						type="text"
						className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-sky-500"
					></input>
				</label>

				<label className="block w-5/6">
					<span className="block text-sm font-medium text-slate-700 after:content-['*'] after:ml-0.5 after:text-red-500">
						Password
					</span>
					<input
						{...register("password", {
							required: "password 입력 해주세요",
						})}
						required
						type="text"
						className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-sky-500"
					></input>
				</label>
				<button className=" w-5/6 Spx-8 py-2 bg-black mt-4 text-white rounded-full hover:text-sky-500">
					Login
				</button>
			</form>
		</div>
	);
};

export default Enter;
