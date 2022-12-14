import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { cls } from "../libs/client/utils";
import useSWR from "swr";
import useMutation from "../libs/client/useMutation";
import useUser from "../libs/client/useUser";
import Image from "next/image";
import ShowInitMessage from "../components/ShowInitMessage";
import AloneQuestion from "./[id]";
import WarningModal from "../components/WarningModal";
import { useRouter } from "next/router";

import dynamic from "next/dynamic";
const Paint = dynamic(() => import("../components/Paint"), {
	ssr: false,
});

interface totalQuestionType {
	[key: string]: any;
}

const Home: NextPage = () => {
	const router = useRouter();
	const { user, isLoading } = useUser();

	const { data: dataMequestion, mutate } = useSWR("/api/users/solve");
	const [solveFn, { data: solveData }] = useMutation("/api/users/solve");

	//const { data, error } = useSWR("/api/users");

	const [totalQuestion, settotalQuestion] = useState<totalQuestionType>([""]);
	const [aloneQuestion, setaloneQuestion] = useState<number>(0);
	const [selectQuestion, setselectQuestion] = useState([""]);
	const [warningModal, setwarningModal] = useState(false);
	const [stateMemo, setstateMemo] = useState(false);
	const [statePaint, settstatePaint] = useState(true);

	const [imgarr, setimgArr] = useState<any>([]);

	const [select, setSelect] = useState({
		selectNum: 0,
		index: 0,
	});
	useEffect(() => {
		if (user && user.student !== "student") {
			router.push("/admin");
		}
	}, [user, isLoading]);

	useEffect(() => {
		if (dataMequestion?.ok) {
			if (dataMequestion.mequestion === null) {
				router.replace("result");
			} else {
				if (dataMequestion?.mequestion) {
					let calData = dataMequestion?.mequestion?.question?.split(",");
					let selectData =
						dataMequestion?.mequestion?.selectQuestion?.split(",");

					settotalQuestion(calData);
					setaloneQuestion(Number(calData[0]));
					setselectQuestion(selectData);

					setSelect({
						selectNum: Number(selectData[0]),
						index: 0,
					});
				}
			}
		}
	}, [dataMequestion]);

	const showonClick = () => {
		mutate(
			(prev: any) =>
				prev && {
					...prev,
					mequestion: {
						...prev.mequestion,
						show: true,
					},
				},
			false
		);
		solveFn({ show: true });
	};
	const onClick = (e: any) => {
		if (select.selectNum === +e.target.value) {
			setSelect((prev) => ({
				...prev,
				selectNum: 0,
			}));
			selectQuestion[select.index] = "0";
			setselectQuestion(selectQuestion);

			solveFn({ selectNum: 0, index: select.index });
		} else {
			setSelect((prev) => ({
				...prev,
				selectNum: +e.target.value,
			}));
			selectQuestion[select.index] = e.target.value;
			setselectQuestion(selectQuestion);
			solveFn({ selectNum: +e.target.value, index: select.index });
		}
	};
	const memoOnclick = () => {
		setstateMemo(!stateMemo);
		settstatePaint(true);
	};

	const onQuestionClick = (data: any, i: any) => {
		setSelect({
			selectNum: Number(selectQuestion[+i]),
			index: +i,
		});
		setaloneQuestion(data);
	};

	const submitOnclick = (e: any) => {
		e.preventDefault();

		if (selectQuestion.includes("0")) {
			setwarningModal(true);
		} else {
			setwarningModal(true);
		}
	};
	return (
		<>
			{user ? (
				<div>
					<div className="w-full h-full ">
						{dataMequestion?.mequestion?.show === false ? (
							<ShowInitMessage handler={showonClick} name={user?.name + ""} />
						) : (
							<div className="fixed z-50 w-full mt-8 h-10 flex items-center justify-between">
								<div className="ml-16 flex flex-col sm:flex-row">
									<div className="font-bold text-lg sm:mr-4">
										{user?.name} ??????
									</div>
									<div className="">{user?.school}</div>
									<div className="sm:ml-4">{user?.grade}??????</div>
								</div>
								<div>
									<button
										onClick={memoOnclick}
										className=" cursor-pointer hover:bg-white hover:text-black border-2  border-transparent hover:border-2 hover:border-black    px-2 py-2 mr-2 sm:px-4 bg-black text-white rounded-2xl ml-auto text-center"
									>
										??????
									</button>

									<button
										onClick={submitOnclick}
										className=" cursor-pointer hover:bg-white hover:text-black border-2  border-transparent hover:border-2 hover:border-black  px-2 py-2 mr-2 sm:px-4 bg-black text-white rounded-2xl ml-auto text-center"
									>
										??????
									</button>
								</div>
							</div>
						)}
						{stateMemo ? (
							<Paint
								handler={setimgArr}
								imgdata={imgarr}
								statePaint={statePaint}
								settstatePaint={settstatePaint}
							/>
						) : (
							""
						)}

						<div className="z-20 fixed pt-20 flex flex-col w-14 h-screen bg-white border-r-2 border-slate-400 items-center">
							<div className="font-bold">?????? </div>
							<br></br>
							{totalQuestion?.map((data: any, i: number) => (
								<div
									key={i}
									onClick={() => onQuestionClick(data, i)}
									className="cursor-pointer hover:bg-slate-300 rounded-md w-10 h-10 m-1 border-black border outline-none flex items-center justify-center relative"
								>
									<div className="text-black">{i + 1}</div>
									{Number(selectQuestion[+i]) !== 0 ? (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5 absolute rounded-full  bg-blue-500 right-0 top-0 -mt-1 -mr-1"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
												clipRule="evenodd"
											/>
										</svg>
									) : (
										""
									)}
								</div>
							))}
						</div>
						{aloneQuestion ? (
							<AloneQuestion
								questionId={Number(aloneQuestion)}
								btnonClick={onClick}
								statebtn={select}
								disabled={false}
							/>
						) : (
							""
						)}
					</div>
					{warningModal ? (
						<WarningModal handler={() => setwarningModal(false)} />
					) : (
						""
					)}
				</div>
			) : (
				<div></div>
			)}
		</>
	);
};

export default Home;
