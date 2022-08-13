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

	return (
		<div className="z-0 pl-20 pr-2 absolute h-full w-full  flex flex-col items-center ">
			<div className="flex absolute top-28">
				<div className="font-bold text-4xl">{statebtn?.index + 1} </div>
				<div className="mt-auto">번 문제 </div>
			</div>

			<br></br>

			<div className="relative   w-full h-full ">
				<Image
					objectFit="contain"
					layout="fill"
					src={`https://imagedelivery.net/fhkogDoSTeLvyDALpsIbnw/${data?.alonequestion?.avatar}/public`}
				/>
			</div>
			<div className="absolute flex bottom-20">
				{[1, 2, 3, 4, 5].map((date, i) => (
					<button
						key={i}
						value={i + 1}
						disabled={disabled}
						onClick={onClick}
						className={cls(
							"sm:mx-2 mx-1 w-8 h-8 sm:w-9 sm:h-9 lg:w-12 lg:h-12 lg:mx-4 rounded-lg flex  items-center justify-center  ",
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
