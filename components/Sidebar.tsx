import Link from "next/link";
import React from "react";

const Sidebar = () => {
	return (
		<div className="border-r w-14 flex flex-col border-r-gray-300 h-screen items-center">
			<button className="h-14 flex justify-center items-center w-full group  hover:bg-black hover:rounded-lg">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 group-hover:bg-black group-hover:stroke-white"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth="2"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
					/>
				</svg>
			</button>
			<button className="h-14 flex justify-center items-center w-full group  hover:bg-black hover:rounded-lg">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 group-hover:bg-black group-hover:stroke-white"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
				</svg>
			</button>

			<div className="h-14 flex justify-center items-center w-full group  hover:bg-black hover:rounded-lg">
				<Link href="/admin/upload">
					<a>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 group-hover:bg-black group-hover:stroke-white"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
								clipRule="evenodd"
							/>
						</svg>
					</a>
				</Link>
			</div>

			<div className="h-14 flex justify-center items-center w-full group  hover:bg-black hover:rounded-lg">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 group-hover:bg-black group-hover:stroke-white"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
				</svg>
			</div>
		</div>
	);
};

export default Sidebar;
