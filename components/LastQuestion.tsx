import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useSWR from "swr";

interface LastQuestionType {
	aloneQuestion: any;
}

const LastQuestion = ({ aloneQuestion }: LastQuestionType) => {
	const router = useRouter();
	const { data } = useSWR(`/api/question/all/me/${router.query.id}`);
	useEffect(() => {
		if (data?.ok) {
			aloneQuestion(data.all[0]);
		}
	}, [data]);

	const onClick = (index: number) => {
		aloneQuestion(data.all[index]);
	};
	return (
		<div className=" absolute w-full pb-6 whitespace-nowrap flex scroll overflow-x-auto ">
			{data?.all?.map((ee: any, i: number) => (
				<button
					className="p-4 mx-2 bg-black rounded-lg text-white"
					onClick={() => onClick(i)}
				>
					<div className="font-bold">시험 제출 날짜</div>
					<div className="text-sm text-slate300">
						{ee.updatedAt.slice(0, 10)}
					</div>
				</button>
			))}
		</div>
	);
};

export default LastQuestion;
