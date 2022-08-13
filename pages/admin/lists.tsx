import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import OpenPicModal from "../../components/openPicModal";
import Sidebar from "../../components/Sidebar";
import Students from "../../components/Students";
import useUser from "../../libs/client/useUser";
import { cls } from "../../libs/client/utils";

const Lists = () => {
	const Ref = useRef<any>(null);
	const { user, isLoading } = useUser();
	const [grade, setGrade] = useState<number>();
	const [state, setState] = useState({
		id: 0,
		difficulty: 0,
		answer: 0,
		minititle: null,
	});
	const [openedit, setopenedit] = useState(false);

	const onClick = (e: any) => {
		setGrade(+e.target.id);
	};
	const [openpic, setopenpic] = useState("");
	const closeHandler = () => {
		setopenpic("");
	};

	const { data } = useSWR(`/api/question/all/${grade}`);

	const onDoubleClick = (e: any, table: string) => {
		setopenedit(true);
		setState((prev) => ({
			...prev,
			id: e.id,
			difficulty: e.difficulty,
			answer: e.answer,
			minititle: e.minititle,
			kind: e.kind,
		}));
	};
	const onChange = (e: any) => {
		setState((prev) => ({
			...prev,
			[e.target.id]:
				e.target.id === "kind" || e.target.id === "minititle"
					? e.target.value
					: Number(e.target.value),
		}));
	};

	const onKeyPress = (e: any) => {
		if (e.key === "Enter" || e.key === "Esc") {
			setopenedit(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", clickModalOutside);

		return () => {
			document.removeEventListener("mousedown", clickModalOutside);
		};
	});
	const clickModalOutside = (event: any) => {
		if (openedit && !Ref.current.contains(event.target)) {
			setopenedit(false);
		}
	};

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
					<button className="ml-auto my-4 rounded-xl px-4 py-2 mx-6 bg-blue-400 text-white">
						저장
					</button>
					<div
						ref={Ref}
						className="h-full w-full overflow-auto  rounded-2xl bg-white shadow-lg  shadow-slate-400"
					>
						<table className="relative w-full  text-center border-collapse gap-1">
							<thead className="sticky top-0 z-10 bg-white">
								<tr>
									<th>선택</th>
									<th>유형</th>
									<th>난이도</th>
									<th>정답</th>
									<th>타이틀</th>
									<th>이미지</th>
								</tr>
							</thead>

							{data?.all?.map((e: any, i: number) => (
								<tbody
									key={i}
									className=" overflow-y-auto cursor-pointer hover:bg-slate-200"
								>
									<tr>
										<td>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className={cls("h-8 w-8")}
												viewBox="0 0 20 20"
											>
												<path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
												<path
													fillRule="evenodd"
													d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
													clipRule="evenodd"
												/>
											</svg>
										</td>
										<td onDoubleClick={() => onDoubleClick(e, "kind")}>
											{openedit ? (
												<input
													id="kind"
													className="w-26"
													placeholder={e.kind}
													defaultValue={e.kind}
													onChange={onChange}
													onKeyPress={onKeyPress}
												/>
											) : (
												e.kind
											)}
										</td>
										<td onDoubleClick={() => onDoubleClick(e, "difficulty")}>
											{openedit ? (
												<input
													id="difficulty"
													className="w-26"
													placeholder={e.difficulty}
													defaultValue={e.difficulty}
													onChange={onChange}
													onKeyPress={onKeyPress}
												/>
											) : (
												e.difficulty
											)}
										</td>
										<td onDoubleClick={() => onDoubleClick(e, "answer")}>
											{openedit ? (
												<input
													id="answer"
													className="w-26"
													placeholder={e.answer}
													defaultValue={e.answer}
													onChange={onChange}
													onKeyPress={onKeyPress}
												/>
											) : (
												e.answer
											)}
										</td>
										<td onDoubleClick={() => onDoubleClick(e, "minititle")}>
											{openedit ? (
												<input
													id="minititle"
													className="w-26"
													placeholder={e.minititle}
													defaultValue={e.minititle}
													onChange={onChange}
													onKeyPress={onKeyPress}
												/>
											) : (
												e.minititle
											)}
										</td>
										<td>
											<div
												className="w-full  h-20 relative "
												onClick={() => setopenpic(e.avatar)}
											>
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
