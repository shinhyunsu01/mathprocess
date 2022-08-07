import Image from "next/image";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Sidebar from "../../components/Sidebar";
import Students from "../../components/Students";

const Lists = () => {
	const [grade, setGrade] = useState(1);
	const onClick = (e: any) => {
		setGrade(+e.target.id);
	};
	const { data } = useSWR(`/api/question/all/${grade}`);
	useEffect(() => {
		console.log("data", data);
		("");
	}, [data]);
	return (
		<div className="flex w-full">
			<Sidebar />
			<Students />
			<div className="w-full m-4 flex flex-col">
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
				<div className="overflow-auto w-full h-full rounded-2xl bg-white shadow-lg  shadow-slate-400">
					<table className="relative w-full text-center border-collapse gap-1">
						<thead>
							<tr>
								<th>유형</th>
								<th>난이도</th>
								<th>정답</th>
								<th>타이틀</th>
								<th>이미지</th>
							</tr>
						</thead>

						{data?.all.map((e: any, i: number) => (
							<tbody key={i} className="cursor-pointer hover:bg-slate-200">
								<tr>
									<td className="">{e.kind}</td>
									<td>{e.difficulty}</td>
									<td>{e.answer}</td>
									<td>{e.minititle}</td>
									<td>
										<div className="w-full  h-14 relative">
											<Image
												layout="fill"
												width={100}
												height={100}
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
	);
};

export default Lists;
/*

{data?.all.map((e: any) => (
						<div className="flex mx-2 my-2">
							<div className="mx-2">{e.kind}</div>
							<div className="mx-2">{e.difficulty}</div>
							<div className="mx-2">{e.answer}</div>
							<div className="mx-2">{e.minititle}</div>
						</div>
					))}

*/
