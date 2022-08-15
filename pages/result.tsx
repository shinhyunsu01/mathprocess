import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { cls } from "../libs/client/utils";
import AloneQuestion from "./[id]";

const Result = () => {
	const { data } = useSWR("/api/question/resultquestion");
	const [answer, setAnswer] = useState([""]);
	const [selectQuestion, setselectQuestion] = useState([""]);
	const [aloneques, setaloneques] = useState([""]);
	const [quesInfo, setquesInfo] = useState({
		index: 0,
		selectNum: 0,
		questionId: 0,
	});
	const [result, setResult] = useState([false]);
	const onClick = (data: any, i: any) => {
		//console.log("data.selectQuestion", data.selectQuestion);
		setselectQuestion(data.selectQuestion.split(",")); //o
		setAnswer(data.answer.split(",")); //o
		setaloneques(data.question.split(","));
	};
	const quesonClick = (index: any) => {
		setquesInfo({
			index: index,
			selectNum: Number(selectQuestion[index]),
			questionId: Number(aloneques[index]),
		});
	};

	useEffect(() => {
		let selectdata = data?.manyquestion[0];
		let selectQues = selectdata?.selectQuestion.split(",");
		let ques = selectdata?.question.split(",");
		let selectAns = selectdata?.answer.split(",");
		setselectQuestion(selectQues); //o
		setAnswer(selectAns); //o
		setaloneques(ques);
		let calData = [false];
		selectAns?.map((data: any, i: number) => {
			let ox = Number(data) !== Number(selectQues[i]) ? false : true;
			calData[i] = ox;
		});
		setResult(calData);
		if (selectQues && ques) {
			setquesInfo({
				index: 0,
				selectNum: Number(selectQues[0]),
				questionId: Number(ques[0]),
			});
		}
	}, [data]);
	return (
		<>
			<div className="w-full h-full ">
				<div className=" fixed  top-4 left-24 h-14 w-full flex items-center  whitespace-nowrap  scroll overflow-x-auto">
					{data?.manyquestion?.map((e: any, i: any) => (
						<button
							key={i}
							onClick={() => onClick(e, i)}
							value={e}
							className="flex flex-col shadow-lg shadow-slate-400  hover:text-black border-2  border-transparent hover:border-2 hover:border-black  hover:bg-white bg-black rounded-2xl items-center text-white p-2 mr-5"
						>
							<div className="text-xs"> 시험 종료 날짜</div>
							<div className="text-blue-300 text-xs">
								{e.updatedAt?.slice(0, 10)}
							</div>
						</button>
					))}
				</div>
				<div className="fixed z-50 pt-20  w-20 px-4 h-full bg-white border-r-2 border-slate-400">
					<div className="flex flex-col w-full  items-center">
						<div className="font-bold  ">문제</div>
						<br></br>

						{selectQuestion?.map((data: any, i: number) => (
							<div
								key={i}
								className={cls(
									"cursor-pointer hover:bg-slate-300 rounded-md w-full h-10 m-1 border-black border outline-none flex items-center justify-center relative",
									result[i] !== true ? "bg-red-500" : "bg-green-500"
								)}
								onClick={() => quesonClick(i)}
							>
								<div className="text-black">{i + 1}</div>

								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5 absolute rounded-full   right-0 top-0 -mt-1 -mr-1"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
						))}
					</div>
				</div>
				<AloneQuestion
					statebtn={quesInfo}
					questionId={quesInfo.questionId}
					btnonClick={""}
					disabled={true}
				/>
			</div>
		</>
	);
};

export default Result;
/*
	<button
							key={i}
							onClick={() => onClick(e, i)}
							value={e}
							className="flex flex-col shadow-lg shadow-slate-400 hover:text-black  hover:outline hover:bg-white bg-black rounded-2xl items-center text-white p-2 mr-5"
						>
							<div> 시험 종료 날짜</div>
							<div className="text-blue-300 text-sm ">
								{e.updatedAt.slice(0, 10)}
							</div>
						</button>
*/
