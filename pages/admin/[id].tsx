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
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const UserId = () => {
	const { user, isLoading } = useUser("teacher");
	const router = useRouter();
	const { data } = useSWR(`/api/question/make/${router.query.id}`);

	/*const [selectQues, setselectQues] = useState([
		{
			id: 0,
			check: false,
		},
	]);*/

	const [selectQues, setselectQues] = useState<number[]>([]);

	const onClick = (e: any) => {
		if (Object.values(selectQues).includes(e.id)) {
			const filters = selectQues.filter((ee) => Number(ee) !== e.id);
			setselectQues(filters);
		} else {
			//console.log("bb");
			setselectQues((prev) => [...prev, e.id]);
		}

		/*click = false;
		selectQues.map((ee: any, i: any) => {
			if (e.id === ee.id) {
				let back = selectQues;
				back[i].check = !back[i].check;
				console.log("after", back);
				setselectQues(back);
				click = true;
				return;
			}
		});

		if (!click) {
			setselectQues((prev) => [
				...prev,
				{
					id: e.id,
					check: false,
				},
			]);
		}*/
	};

	const [openpic, setopenpic] = useState("");
	const closeHandler = () => {
		setopenpic("");
	};

	useEffect(() => {
		console.log("selectQues", selectQues);
	}, [selectQues]);

	return (
		<>
			<div className="flex w-full">
				<Sidebar />
				<Students />
				<div className="fixed top-3 right-5 flex">
					<button className="text-bold hover:bg-white hover:text-black px-4 py-2 cursor-pointer rounded-2xl bg-black  shadow-lg shadow-slate-400  text-white">
						시험 출제
					</button>
				</div>
				<div className="flex flex-col">
					<ApexChart
						type="radialBar"
						series={[44, 55, 67, 100]}
						options={{
							chart: {
								height: 350,
							},

							labels: ["Apples", "Oranges", "Bananas", "Berries"],
						}}
					/>

					<table className="relative w-full text-center border-collapse gap-1">
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
							<tbody className="h-14  hover:bg-slate-200">
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
		</>
	);
};

export default UserId;
