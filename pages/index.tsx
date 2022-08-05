import type { NextPage } from "next";

const Home: NextPage = () => {
	return (
		<div className="w-full h-screen">
			<div className="fixed w-full mt-2 h-10 flex items-center">
				<div className="ml-20 font-bold text-lg">김민수 학생</div>
				<div className="ml-2">서신고등학교 1학년</div>
				<div className="px-6 py-2 mr-2  bg-sky-500 text-white rounded-full ml-auto text-center">
					제출
				</div>
			</div>

			<div className="absolute pt-20 flex flex-col w-14 h-screen bg-gray-500 items-center">
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((date, i) => (
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
								fill-rule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clip-rule="evenodd"
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
							className="focus:ring-2 m-5 rounded-full w-8 h-8 bg-black flex  items-center justify-center text-white"
						>
							<div>{i + 1}</div>
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default Home;
