import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Students from "../../components/Students";
import dynamic from "next/dynamic";
import useUser from "../../libs/client/useUser";
import useMutation from "../../libs/client/useMutation";
import useSWR from "swr";
import { useRouter } from "next/router";
import Image from "next/image";
import { cls } from "../../libs/client/utils";
import OpenPicModal from "../../components/openPicModal";
import ErrorModal from "../../components/ErrorModal";
import QuestionList from "../../components/QuestionList";
import LastQuestion from "../../components/LastQuestion";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface MakeType {
	ok: boolean;
	canQuestions: any;
}

const UserId = () => {
	//const { user, isLoading } = useUser();
	let router = useRouter();
	const { data } = useSWR<MakeType>(
		router.query.id ? `/api/question/make/${router.query.id}` : null
	);
	const colors = [
		"#33b2df",
		"#546E7A",
		"#d4526e",
		"#13d8aa",
		"#A5978B",
		"#2b908f",
		"#f9a3a4",
		"#90ee7e",
		"#f48024",
		"#69d2e7",
	];

	const [makeFn, { data: makedata }] = useMutation(
		`/api/question/make/${router.query.id}`
	);
	const { data: selectUser } = useSWR(
		router.query.id ? `/api/users/selectuser/${router.query.id}` : null
	);
	const [selectQues, setselectQues] = useState<number[]>([]);
	const [chartX, setchartX] = useState<string[]>([""]);
	const [chartVal, setchartVal] = useState<number[]>([]);
	const [errorModal, setErrorModal] = useState(false);
	const [submittloading, setsutmitLoading] = useState(false);
	const [aloneQuestion, setAloneQuestion] = useState();
	const [openpic, setopenpic] = useState("");

	const closeHandler = () => {
		setopenpic("");
	};
	const closeErrHandler = () => {
		setErrorModal(false);
	};

	const onClick = (e: any) => {
		if (Object.values(selectQues).includes(e.id)) {
			const filters = selectQues.filter((ee) => Number(ee) !== e.id);
			setselectQues(filters);
		} else {
			setselectQues((prev) => [...prev, e.id]);
		}
	};

	const submitonClick = () => {
		setsutmitLoading(true);
		let mapsubmit = new Map();
		for (let cnt = 0; cnt < selectQues.length; cnt++) {
			data?.canQuestions.map((ee: any) => {
				if (ee.id === selectQues[cnt]) {
					if (mapsubmit.has(ee.kind)) {
						setErrorModal(true);
						return;
					}
					mapsubmit.set(ee.kind, 1);
				}
			});
		}

		makeFn({ allquestion: selectQues });
	};

	useEffect(() => {
		if (selectUser?.userInfo?.score) {
			let score = selectUser?.userInfo?.score;
			let xData = [""];
			let val = [0];
			score?.split(",").map((e: any, i: number) => {
				let data = e.split("_");
				xData[i] = data[0];
				val[i] = data[1];
				//val[i] = (data[1] / 5) * 100;
			});

			setchartVal(val);
			setchartX(xData);
		}
	}, [selectUser]);

	useEffect(() => {
		if (makedata?.ok === true) {
			setsutmitLoading(false);
		}
	}, [makedata]);

	useEffect(() => {
		let selectset = new Map();
		let arr = [0];
		if (data?.canQuestions) {
			data?.canQuestions.map((ee: any, i: number) => {
				if (selectset.has(ee.kind)) {
				} else {
					selectset.set(ee.kind, 1);
					if (i === 0) arr[0] = ee.id;
					else arr.push(ee.id);
				}
			});
		}
		setselectQues(arr);
	}, [data]);

	return (
		<>
			<div className="flex w-full h-full  ">
				<Sidebar />
				<Students />
				<QuestionList aloneQuestion={aloneQuestion} />
				<div className="fixed z-30 top-3 right-5 flex ">
					{selectUser?.userInfo?.qnasubmit === false ? (
						<div
							onClick={submitonClick}
							className={cls(
								`text-bold flex hover:bg-white group hover:text-black px-4 py-2 cursor-pointer rounded-2xl bg-black  shadow-lg shadow-slate-400  text-white`
							)}
						>
							{submittloading ? (
								<svg
									className="animate-spin -ml-1 mr-3 h-5 w-5 text-white group-hover:text-black"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
										className="opacity-25 "
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									></circle>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									></path>
								</svg>
							) : (
								""
							)}

							<div>{submittloading ? "Processsing" : "시험 출제"}</div>
						</div>
					) : (
						<div className="text-bold flex px-4 py-2  rounded-2xl bg-blue-500  shadow-lg shadow-slate-400  text-white">
							시험 진행중
						</div>
					)}
				</div>
				<div className=" relative flex flex-col w-full h-full mt-4 mx-10 ">
					<LastQuestion aloneQuestion={setAloneQuestion} />
					<div className="relative w-2/4 mt-20">
						<ApexChart
							type="bar"
							series={[
								{
									data: chartVal,
								},
							]}
							options={{
								xaxis: {
									categories: chartX,
									labels: {
										style: {
											colors: colors,
											fontSize: "12px",
										},
									},
								},
								colors: colors,
								dataLabels: {
									enabled: false,
								},
								legend: {
									show: false,
								},
								plotOptions: {
									bar: {
										columnWidth: "45%",
										distributed: true,
									},
								},
							}}
						/>
					</div>

					<div
						className={cls(
							"w-full overflow-scroll relative rounded-2xl shadow-lg  shadow-slate-400",
							data?.canQuestions.length === 0 ? "h-30" : "h-[460px]"
						)}
					>
						{data?.canQuestions && selectUser?.userInfo?.qnasubmit ? (
							<div className="z-40 absolute w-full h-full bg-slate-300 opacity-80 flex items-center justify-center">
								<div className="text-2xl font-bold">시험 중 입니다</div>
							</div>
						) : (
							<table className="w-full  relative  mt-auto text-center border-collapse ">
								<thead className="sticky top-0 z-10 h-14 bg-white ">
									<tr>
										<th></th>
										<th>유형</th>
										<th>난이도</th>
										<th>타이틀</th>
										<th>이미지</th>
									</tr>
								</thead>

								{data?.canQuestions?.map((ee: any, i: number) => (
									<tbody
										key={i}
										className="h-14 overflow-y-auto  hover:bg-slate-200"
									>
										<tr>
											<td className="cursor-pointer">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className={cls(
														"h-8 w-8",
														selectQues.includes(ee.id)
															? "fill-green-500"
															: "fill-current"
													)}
													viewBox="0 0 20 20"
													onClick={() => onClick(ee)}
												>
													<path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
													<path
														fillRule="evenodd"
														d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
														clipRule="evenodd"
													/>
												</svg>
											</td>
											<td>{ee.kind}</td>
											<td>{ee.difficulty}</td>
											<td>{ee.minititle}</td>
											<td>
												<div className="w-full  h-20 relative cursor-pointer">
													<Image
														onClick={() => setopenpic(ee?.avatar)}
														layout="fill"
														objectFit="contain"
														src={`https://imagedelivery.net/fhkogDoSTeLvyDALpsIbnw/${ee?.avatar}/public`}
													/>
												</div>
											</td>
										</tr>
									</tbody>
								))}
							</table>
						)}
					</div>
				</div>
			</div>
			{openpic !== "" ? (
				<OpenPicModal handler={closeHandler} avatar={openpic} />
			) : (
				""
			)}
			{errorModal ? (
				<ErrorModal
					handler={closeErrHandler}
					message="중복된 유형이 있습니다"
				/>
			) : (
				""
			)}
		</>
	);
};

export default UserId;
