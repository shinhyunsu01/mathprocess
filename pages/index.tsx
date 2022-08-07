import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { cls } from "../libs/client/utils";
import useSWR from "swr";
import useMutation from "../libs/client/useMutation";
import useUser from "../libs/client/useUser";

const Home: NextPage = () => {
	const { user, isLoading } = useUser("student");
	const [select, setSelect] = useState(0);
	const { data, error } = useSWR("/api/users");
	const [totalQuestion, settotalQuestion] = useState([0]);

	const onClick = (e: any) => {
		if (select === +e.target.value) {
			setSelect(0);
		} else setSelect(+e.target.value);
	};

	useEffect(() => {
		if (data?.ok) {
			console.log("data", data);
		}
	}, [data]);

	return (
		<div className="w-full h-screen">
			<div className="fixed w-full mt-2 h-10 flex items-center">
				<div className="ml-20 font-bold text-lg">
					{data?.userInfo?.name} 학생
				</div>
				<div className="ml-2">
					{data?.userInfo?.school} {data?.userInfo?.grade}학년
				</div>
				<div className="px-6 py-2 mr-2  bg-cyan-300 text-white rounded-full ml-auto text-center">
					제출
				</div>
			</div>

			<div className="absolute pt-20 flex flex-col w-14 h-screen bg-gray-500 items-center">
				{totalQuestion.map((date, i) => (
					<div
						key={i}
						className="cursor-pointer rounded-md w-10 h-10 m-1 border-white border outline-none flex items-center justify-center relative"
					>
						<div className="text-white">{i + 1}</div>

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
					</div>
				))}
			</div>

			<div className="w-full h-full flex flex-col items-center justify-center">
				<div className="h-16 w-5/6">1. 미분 적분</div>
				<div className="bg-black w-1/2 h-1/2" />
				<div className="mt-5 flex ">
					{[1, 2, 3, 4, 5].map((date, i) => (
						<button
							key={i}
							value={i + 1}
							onClick={onClick}
							className={cls(
								"m-5  w-9 h-9    rounded-lg flex  items-center justify-center  ",
								select === i + 1
									? "bg-slate-900 font-semibold text-white"
									: "bg-white text-slate-700"
							)}
						>
							{i + 1}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default Home;
