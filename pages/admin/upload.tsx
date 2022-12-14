import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Sidebar from "../../components/Sidebar";
import Students from "../../components/Students";
import useMutation from "../../libs/client/useMutation";
import useUser from "../../libs/client/useUser";

interface uploadTypes {
	grade: number;
	kind: string;
	answer: number;
	fileList: FileList;
	minititle?: string;
	difficulty: number;
}

const Upload = () => {
	const { user, isLoading } = useUser();
	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<uploadTypes>();
	const [uploadFn, { data }] = useMutation("/api/upload");
	const [photoPreview, setPhotoPreview] = useState("");
	const [okdb, setokdb] = useState("");

	const onValid = async ({
		grade,
		kind,
		answer,
		fileList,
		minititle,
		difficulty,
	}: uploadTypes) => {
		if (fileList && fileList.length > 0) {
			const { uploadURL } = await (await fetch(`/api/upload/files`)).json();
			const form = new FormData();
			form.append("file", fileList[0]);

			if (uploadURL) {
				const {
					result: { id },
				} = await (
					await fetch(uploadURL, { method: "POST", body: form })
				).json();

				uploadFn({ grade, kind, answer, avatar: id, minititle, difficulty });
			}
		}
	};
	const file = watch("fileList");
	useEffect(() => {
		if (file && file.length > 0) {
			const filedata = file[0];
			setPhotoPreview(URL.createObjectURL(filedata));
		}
	}, [file]);

	useEffect(() => {
		if (data?.ok) {
			setokdb("ok!!");
		}
	}, [data]);
	return (
		<div className="flex">
			<Sidebar />
			<Students />
			<form
				className="w-full  flex flex-col items-center justify-center"
				onSubmit={handleSubmit(onValid)}
			>
				<div className="w-full  flex items-center justify-center ">
					<label className="w-60 h-60 mr-5">
						{photoPreview ? (
							<img
								src={photoPreview}
								className="cursor-pointer w-full h-full text-center font-bold flex mx-2 border-2 border-dashed border-gray-300 items-center justify-center rounded-lg"
							/>
						) : (
							<div className="cursor-pointer w-full h-full text-center font-bold flex mx-2 border-2 border-dashed border-gray-300 items-center justify-center rounded-lg">
								Upload
							</div>
						)}

						<input
							{...register("fileList")}
							accept="image/*"
							className="hidden"
							type="file"
							required
						/>
					</label>
					<div className="w-60  mx-2 flex flex-col">
						<div className="text-sm font-medium text-slate-700  after:content-['*'] after:ml-0.5 after:text-red-500">
							??????
						</div>
						<input
							{...register("grade", {
								required: "?????? ?????? ????????????(?????? ???)",
							})}
							type="number"
							required
							className="mt-1 w-full  px-3 py-2 bg-white border border-slate-300 rounded-md text-sm placeholder-slate-400 
                        focus:outline-none foucs:border-sky-500 focus:
                        "
							placeholder="?????? 1,2,3 ex) 1"
						></input>
						{errors.grade?.message}

						<div className="mt-2 text-sm font-medium text-slate-700  after:content-['*'] after:ml-0.5 after:text-red-500">
							?????????
						</div>
						<input
							{...register("difficulty", {
								required: "????????? ?????? ????????????",
							})}
							type="text"
							required
							className="mt-1 w-full  px-3 py-2 bg-white border border-slate-300 rounded-md text-sm placeholder-slate-400 
                        focus:outline-none foucs:border-sky-500 focus:
                        "
							placeholder="????????? 1~5"
						></input>
						{errors.difficulty?.message}

						<div className="mt-2 text-sm font-medium text-slate-700  after:content-['*'] after:ml-0.5 after:text-red-500">
							??????
						</div>
						<input
							{...register("kind", {
								required: "?????? ?????? ????????????",
							})}
							type="text"
							required
							className="mt-1 w-full  px-3 py-2 bg-white border border-slate-300 rounded-md text-sm placeholder-slate-400 
                        focus:outline-none foucs:border-sky-500 focus:
                        "
							placeholder="???????????? X ex) ???????????? "
						></input>
						{errors.kind?.message}

						<div className="mt-2 text-sm font-medium text-slate-700  after:content-['*'] after:ml-0.5 after:text-red-500">
							??????
						</div>
						<input
							{...register("answer", {
								required: "?????? ?????? ????????????(?????????)",
							})}
							type="number"
							required
							className="mt-1 w-full  px-3 py-2 bg-white border border-slate-300 rounded-md text-sm placeholder-slate-400 
                        focus:outline-none foucs:border-sky-500 focus:
                        "
							placeholder="?????? 1,2,3,4,5 ex) 2"
						></input>
						{errors.answer?.message}

						<div className="mt-2 text-sm font-medium text-slate-700 ">
							?????? ?????????
						</div>
						<input
							{...register("minititle")}
							type="text"
							className="mt-1 w-full  px-3 py-2 bg-white border border-slate-300 rounded-md text-sm placeholder-slate-400 
                        focus:outline-none foucs:border-sky-500 focus:
                        "
							placeholder="????????? ????????? ?????? ??? ?????? ex) ..."
						></input>
						{errors.minititle?.message}
					</div>
				</div>
				<button className="hover:text-black border-2  border-transparent hover:border-2 hover:border-black hover:bg-white py-2 px-12 m-2 bg-black text-white rounded-full mt-6">
					Upload
				</button>
				{okdb ? <div className="text-black">{okdb}</div> : ""}
			</form>
		</div>
	);
};

export default Upload;
