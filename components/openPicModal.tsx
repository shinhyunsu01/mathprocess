import Image from "next/image";
import React from "react";

interface openPicModalType {
	handler: any;
	avatar: any;
}
const OpenPicModal = ({ handler, avatar }: openPicModalType) => {
	return (
		<div className=" fixed z-20 top-0 w-full h-full flex items-center justify-center">
			<div className="w-80 h-80  relative z-20 p-4 rounded-2xl bg-white shadow-lg shadow-slate-400  flex flex-col">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="z-10 absolute h-6 w-6 ml-auto top-2 right-2 cursor-pointer"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth="2"
					onClick={handler}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
				<div className="w-full  h-full relative">
					<Image
						objectFit="contain"
						layout="fill"
						src={`https://imagedelivery.net/fhkogDoSTeLvyDALpsIbnw/${avatar}/public`}
					/>
				</div>
			</div>
		</div>
	);
};

export default OpenPicModal;
