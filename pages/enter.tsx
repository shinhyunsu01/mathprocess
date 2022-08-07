import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Bubble from "../components/Bubble";
import useMutation from "../libs/client/useMutation";

interface enterTypes {
	username: string;
	payload: string;
}
const Enter = () => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<enterTypes>();
	const [enterfn, { data, loading }] = useMutation("/api/users/enter");

	const onValid = ({ username, payload }: enterTypes) => {
		console.log("aa", username, payload);
		enterfn({ name: username, payload });
	};

	useEffect(() => {
		if (data?.ok) {
			if (data.user !== null) {
				//페이진 이동
				if (data.user.student === "student") {
					router.push("/");
				} else if (data.user.student === "teacher") {
					router.push("/admin");
				}
			} else {
				setTimeout(() => {
					reset();
					data.ok = false;
					data.user = null;
				}, 1000);
			}
		}
		console.log("data", data);
	}, [data]);
	return (
		<div className="flex w-full h-screen items-center justify-center ">
			<Bubble />

			<form
				onSubmit={handleSubmit(onValid)}
				className="absolute flex flex-col w-64 h-64 border-slate-300 border  rounded-md  justify-center items-center "
			>
				<div className="p-2 font-bold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 stext-white rounded-full">
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
						인증번호
					</span>
					<input
						{...register("payload", {
							required: "인증번호 입력 해주세요",
						})}
						required
						type="text"
						className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-sky-500"
					></input>
				</label>
				<button className=" w-5/6 Spx-8 py-2 bg-black mt-4 text-white rounded-full hover:text-sky-500">
					{loading ? "Loading..." : "Login"}
				</button>
				{data?.ok === true && data?.user === null ? (
					<div className="absolute transition-all px-4 rounded-2xl border border-slate-300  bg-white w-5/6 h-5/6 text-center flex items-center justify-center">
						<div className="font-sm ">인증 번호 확인 해주세요</div>
					</div>
				) : (
					""
				)}
			</form>
		</div>
	);
};

export default Enter;
