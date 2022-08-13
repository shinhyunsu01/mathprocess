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
			console.log("oroiginn", dataMequestion);
			if (dataMequestion.mequestion === null) {
				router.replace("result");
			} else {
				if (dataMequestion?.mequestion) {
					console.log("???", dataMequestion?.mequestion, dataMequestion);
					let calData = dataMequestion?.mequestion?.question?.split(",");
					let selectData =
						dataMequestion?.mequestion?.selectQuestion?.split(",");
					console.log("!!!!", dataMequestion?.mequestion, dataMequestion);
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
		}
	}; /*
	useEffect(() => {
		if (user?.student !== "student") {
			router.replace("enter");
		}
	}, [user]);

	/*
{dataMequestion?.mequestion?.show === false ? (
					<ShowInitMessage handler={showonClick} name={user?.name + ""} />
				) : (
					""
				)}

	*/
	return (
		<>
			<div className="w-full h-full">
				{dataMequestion?.mequestion?.show === false ? (
					<ShowInitMessage handler={showonClick} name={user?.name + ""} />
				) : (
					""
				)}
				<div className="fixed w-full mt-8 h-10 flex items-center justify-between">
					<div className="ml-20 flex flex-col sm:flex-row">
						<div className="font-bold text-lg sm:mr-4">{user?.name} 학생</div>
						<div className="">{user?.school}</div>
						<div className="sm:ml-4">{user?.grade}학년</div>
					</div>
					<div></div>
					<button
						onClick={submitOnclick}
						className="hover:bg-white hover:text-black hover:outline px-6 py-2 mr-2 bg-black text-white rounded-2xl ml-auto text-center"
					>
						제출
					</button>
				</div>

				<div className="fixed pt-20 flex flex-col w-14 h-screen bg-white border-r-2 border-slate-400 items-center">
					<div className="font-bold">문제 </div>
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
		</>
	);
};

export default Home;
