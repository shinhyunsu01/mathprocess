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
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface MakeType {
	ok: boolean;
	canQuestions: any;
}

const UserId = () => {
	const { user, isLoading } = useUser("teacher");
	let router = useRouter();

	//const pageId = router.query.id !== undefined ? router.query.id : "";

	const { data } = useSWR<MakeType>(
		router.query.id ? `/api/question/make/${router.query.id}` : null
	);

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

	useEffect(() => {
		console.log("selectUser", selectUser);
		if (selectUser?.userInfo?.score) {
			console.log("ook");
			let score = selectUser?.userInfo?.score;
			let xData = [""];
			let val = [0];
			score?.split(",").map((e: any, i: number) => {
				let data = e.split("_");
				xData[i] = data[0];
				val[i] = (data[1] / 5) * 100;
			});

			setchartVal(val);
			setchartX(xData);
		}
	}, [selectUser]);

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
		if (makedata?.ok === true) {
			setsutmitLoading(false);
		}
	}, [makedata]);

	useEffect(() => {}, [data]);

	return (
		<>
			<div className="flex w-full">
				<Sidebar />
				<Students />
				<div className="fixed top-3 right-5 flex">
					<div
						onClick={submitonClick}
						className={cls(
							`text-bold flex hover:bg-white hover:text-black px-4 py-2 cursor-pointer rounded-2xl bg-black  shadow-lg shadow-slate-400  text-white`
						)}
					>
						{submittloading ? (
							<svg
								className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									className="opacity-25"
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
						<div>{makedata?.ok ? "Processsing" : "시험 출제"}</div>
					</div>
				</div>
				<div className="flex flex-col w-full h-full mt-16 mr-10 ">
					<div className=" flex w-full items-center mb-10 border-b-2">
						<div className=" w-1/2">
							<ApexChart
								type="radialBar"
								series={chartVal}
								options={{
									labels: chartX,
								}}
							/>
						</div>
						<div className="grid grid-cols-5 gap-2 w-full">
							{[1, 2, 3, 4, 5, 67, 8, 9, 10].map((_, i) => (
								<div
									key={i}
									className="flex flex-col bg-black p-4 rounded-2xl text-white"
								>
									<div>미분</div>
									<div>
										<span>1</span>
										<span>/10</span>
									</div>
								</div>
							))}
						</div>
					</div>

					<table className=" w-full mt-auto text-center border-collapse gap-1">
						<thead className="sticky top-0 z-10 bg-white">
							<tr>
								<th></th>
								<th>유형</th>
								<th>난이도</th>
								<th>타이틀</th>
								<th>이미지</th>
							</tr>
						</thead>
						{data?.canQuestions?.map((ee: any, i: number) => (
							<tbody key={i} className="h-14  hover:bg-slate-200">
								<tr>
									<td className="cursor-pointer">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className={cls(
												"h-8 w-8",
												selectQues.includes(ee.id)
													? "fill-blue-500"
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
												width={100}
												height={100}
												src={`https://imagedelivery.net/fhkogDoSTeLvyDALpsIbnw/${ee?.avatar}/public`}
											/>
										</div>
									</td>
								</tr>
							</tbody>
						))}
					</table>
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
