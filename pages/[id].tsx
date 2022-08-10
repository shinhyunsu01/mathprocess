import Image from "next/image";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import useMutation from "../libs/client/useMutation";
import { cls } from "../libs/client/utils";

interface AloneQuestionType {
	questionId: number;
	btnonClick: any;
	statebtn: any;
	disabled: boolean;
}

const AloneQuestion = ({
	questionId,
	btnonClick,
	statebtn,
	disabled,
}: AloneQuestionType) => {
	const { data } = useSWR(`/api/question/${questionId}`);

	const onClick = (e: any) => {
		btnonClick(e);
	};

	useEffect(() => {
		console.log("111data", data, questionId);
	}, [data]);
	return (
		<div className="w-full h-full  flex flex-col items-center justify-center">
			<div className="flex">
				<div className="font-bold text-4xl">{statebtn?.index + 1} </div>
				<div className="mt-auto">번 문제 </div>
			</div>

			<br></br>

			<div className="bg-black rounded-2xl w-1/2 h-1/2 relative object-none">
				<Image
					objectFit="contain"
					layout="fill"
					src={`https://imagedelivery.net/fhkogDoSTeLvyDALpsIbnw/${data?.alonequestion?.avatar}/public`}
				/>
			</div>

			<div className="mt-5 flex ">
				{[1, 2, 3, 4, 5].map((date, i) => (
					<button
						key={i}
						value={i + 1}
						disabled={disabled}
						onClick={onClick}
						className={cls(
							"m-5  w-9 h-9    rounded-lg flex  items-center justify-center  ",
							statebtn?.selectNum === i + 1
								? "bg-slate-900 font-semibold text-white"
								: "bg-white text-slate-700"
						)}
					>
						{i + 1}
					</button>
				))}
			</div>
		</div>
	);
};

export default AloneQuestion;
