import e from "express";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { cls } from "../libs/client/utils";
import AddStudentModal from "./addStudentModal";
import EditModal from "./EditModal";

const Students = () => {
	const { data, mutate } = useSWR("/api/users/all");
	const [addState, setAddState] = useState(false);
	const [modifyState, setmodifyState] = useState(false);
	const [modalState, setmodalState] = useState(false);
	const [userstate, setUserState] = useState({});

	const addStudent = (e: any) => {
		setAddState(true);
	};
	const editOpen = (e: any) => {
		setmodifyState(!modifyState);
	};
	const editHandler = (e: any) => {
		setUserState({
			name: e.name,
			school: e.school,
			grade: e.grade,
			id: Number(e.id),
		});
		setmodalState(true);
	};

	return (
		<>
			<div className="border-r w-60 flex flex-col border-r-gray-300 h-screen overflow-auto ">
				<div className="flex  ml-auto ">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 ml-auto mr-2  mt-2 cursor-pointer"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth="2"
						onClick={addStudent}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 4v16m8-8H4"
						/>
					</svg>

					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 mt-2 cursor-pointer mr-2"
						viewBox="0 0 20 20"
						fill="currentColor"
						onClick={editOpen}
					>
						<path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
						<path
							fillRule="evenodd"
							d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
							clipRule="evenodd"
						/>
					</svg>
				</div>

				{data?.usersInfo?.map((e: any, i: number) => (
					<Link href={`/admin/${e.id}`} key={i}>
						<a>
							<div className="flex w-full items-center hover:bg-slate-300 rounded-lg cursor-pointer">
								{modifyState ? (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth="2"
										onClick={() => editHandler(e)}
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M13 5l7 7-7 7M5 5l7 7-7 7"
										/>
									</svg>
								) : (
									""
								)}

								<div className="flex flex-col m-2 ">
									<div className=" font-bold text-sm">{e.name}</div>
									<div className=" font-normal text-sm text-slate-400">
										{e.school}
									</div>
									<div className=" font-normal text-sm text-slate-400">
										{e.grade}학년
									</div>
								</div>

								<svg
									xmlns="http://www.w3.org/2000/svg "
									className={cls(
										"w-5 h-5 ",
										e.qnasubmit === false ? "fill-red-500" : "fill-green-500"
									)}
									viewBox="0 0 20 20"
								>
									<path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
								</svg>
							</div>
						</a>
					</Link>
				))}
			</div>
			{addState ? (
				<AddStudentModal handler={setAddState} mutate={mutate} />
			) : (
				""
			)}
			{modalState ? (
				<EditModal
					handler={() => setmodalState(false)}
					state={userstate}
					setstate={setUserState}
				/>
			) : (
				""
			)}
		</>
	);
};

export default Students;
