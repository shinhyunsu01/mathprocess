import e from "express";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { cls } from "../libs/client/utils";
import AddStudentModal from "./addStudentModal";

const Students = () => {
	const { data, mutate } = useSWR("/api/users/all");
	const [addState, setAddState] = useState(false);

	const addStudent = (e: any) => {
		setAddState(true);
	};

	return (
		<>
			<div className="border-r w-52 flex flex-col border-r-gray-300 h-screen overflow-auto ">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6 ml-auto mr-1 mt-2 cursor-pointer"
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
				{data?.usersInfo?.map((e: any, i: number) => (
					<Link href={`/admin/${e.id}`} key={i}>
						<a>
							<div className="flex w-full items-center hover:bg-slate-300 rounded-lg cursor-pointer">
								<div className="flex flex-col m-2 ">
									<div className=" font-bold text-sm">{e.name}</div>
									<div className=" font-normal text-sm text-slate-400">
										{e.school} {e.grade}학년
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
		</>
	);
};

export default Students;
