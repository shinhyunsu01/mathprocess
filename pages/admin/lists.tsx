import Image from "next/image";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import OpenPicModal from "../../components/openPicModal";
import Sidebar from "../../components/Sidebar";
import Students from "../../components/Students";
import useUser from "../../libs/client/useUser";

const Lists = () => {
	const { user, isLoading } = useUser();
	const [grade, setGrade] = useState(1);
	const onClick = (e: any) => {
		setGrade(+e.target.id);
	};
	const [openpic, setopenpic] = useState("");
	const closeHandler = () => {
		setopenpic("");
	};

	const { data } = useSWR(`/api/question/all/${grade}`);

	return (
		<>
			<div className="flex w-full h-full">
				<Sidebar />
				<Students />
				<div className="w-full m-4 flex flex-col h-full">
					<div className="flex justify-center">
						<button
							id="1"
							onClick={onClick}
							className="hover:bg-slate-200 bg-white shadow-lg shadow-slate-400 rounded-2xl p-10 m-4"
						>
							<span className="text-3xl">1</span> <span>학년</span>
							<br></br>
							<br></br>
							<span className="text-slate-500">Total 유형</span>{" "}
							<span className="text-3xl">10</span>
							<span className="text-slate-500"> 개</span>
							<br></br>
							<span className="text-slate-500">Total 문제</span>{" "}
							<span className="text-3xl">10</span>
							<span className="text-slate-500"> 개</span>
						</button>

						<button
							id="2"
							onClick={onClick}
							className="hover:bg-slate-200 bg-white shadow-lg shadow-slate-400 rounded-2xl p-10 m-4"
						>
							<span className="text-3xl">2</span> <span>학년</span>
							<br></br>
							<br></br>
							<span className="text-slate-500">Total 유형</span>{" "}
							<span className="text-3xl">10</span>
							<span className="text-slate-500"> 개</span>
							<br></br>
							<span className="text-slate-500">Total 문제</span>{" "}
							<span className="text-3xl">10</span>
							<span className="text-slate-500"> 개</span>
						</button>

						<button
							id="3"
							onClick={onClick}
							className="hover:bg-slate-200 bg-white shadow-lg shadow-slate-400 rounded-2xl p-10 m-4"
						>
							<span className="text-3xl">3</span> <span>학년</span>
							<br></br>
							<br></br>
							<span className="text-slate-500">Total 유형</span>{" "}
							<span className="text-3xl">10</span>
							<span className="text-slate-500"> 개</span>
							<br></br>
							<span className="text-slate-500">Total 문제</span>{" "}
							<span className="text-3xl">10</span>
							<span className="text-slate-500"> 개</span>
						</button>
					</div>
					<div className="h-full w-full overflow-auto  rounded-2xl bg-white shadow-lg  shadow-slate-400">
						<table className="relative w-full  text-center border-collapse gap-1">
							<thead className="sticky top-0 z-10 bg-white">
								<tr>
									<th>유형</th>
									<th>난이도</th>
									<th>정답</th>
									<th>타이틀</th>
									<th>이미지</th>
								</tr>
							</thead>

							{data?.all.map((e: any, i: number) => (
								<tbody
									key={i}
									className=" overflow-y-auto cursor-pointer hover:bg-slate-200"
									onClick={() => setopenpic(e.avatar)}
								>
									<tr>
										<td className="">{e.kind}</td>
										<td>{e.difficulty}</td>
										<td>{e.answer}</td>
										<td>{e.minititle}</td>
										<td>
											<div className="w-full  h-20 relative">
												<Image
													layout="fill"
													src={`https://imagedelivery.net/fhkogDoSTeLvyDALpsIbnw/${e?.avatar}/public`}
												/>
											</div>
										</td>
									</tr>
								</tbody>
							))}
						</table>
					</div>
				</div>
			</div>
			{openpic !== "" ? (
				<OpenPicModal handler={closeHandler} avatar={openpic} />
			) : (
				""
			)}
		</>
	);
};

export default Lists;
