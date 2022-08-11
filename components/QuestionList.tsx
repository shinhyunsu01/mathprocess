import Image from "next/image";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { cls } from "../libs/client/utils";
import QuestionOpenResult from "./QuestionOpenResult";

interface QuestionListType {
	aloneQuestion: any;
}

const QuestionList = ({ aloneQuestion }: QuestionListType) => {
	const { data } = useSWR(`/api/question/all/avatar/${aloneQuestion?.id}`);
	const [state, setState] = useState({});
	const [open, setOpen] = useState(false);
	const onClick = (ee: any) => {
		setOpen(true);
		setState(ee);
	};

	useEffect(() => {
		console.log(open);
	}, [open]);

	return (
		<>
			<div className="border-r overflow-scroll h-full w-52 flex flex-col border-r-gray-300  items-center">
				<div className="mt-4 font-bold">출제 문제</div>
				<div className="flex flex-col ">
					{data?.allQues?.map((ee: any, i: number) => (
						<button
							className="  w-20 h-20 relative m-2 "
							key={i}
							onClick={() => onClick(ee)}
						>
							<div
								className={cls(
									"w-full h-full rounded-xl  border",
									ee.answer !== ee.select
										? "border-red-500"
										: "border-green-500"
								)}
							>
								<Image
									layout="fill"
									objectFit="contain"
									src={`https://imagedelivery.net/fhkogDoSTeLvyDALpsIbnw/${ee.avatar}/public`}
								/>
							</div>
						</button>
					))}
				</div>
			</div>
			{open ? (
				<QuestionOpenResult state={state} handler={() => setOpen(false)} />
			) : (
				""
			)}
		</>
	);
};

export default QuestionList;

/*
{data?.allQues?.map((ee: any, i: number) => (
*/
