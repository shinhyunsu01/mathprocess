import React, {
	Dispatch,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

interface CanvasProps {
	width: number;
	height: number;
}

interface Coordinate {
	x: number;
	y: number;
}
interface PaintType {
	handler: Dispatch<any>;
	imgdata: any[];
	statePaint: boolean;
	settstatePaint: Dispatch<any>;
}

const Paint = ({ handler, imgdata, statePaint, settstatePaint }: PaintType) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const [mousePosition, setMousePosition] =
		useState<Coordinate | undefined>(undefined);
	const [isPainting, setIsPainting] = useState(false);
	const [color, setColor] = useState("black");
	const [width, setWidth] = useState(3);
	const [flag, setFlag] = useState(false);

	const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
		if (!canvasRef.current) {
			return;
		}

		const canvas: HTMLCanvasElement = canvasRef.current;
		return {
			x: event.pageX - canvas.offsetLeft,
			y: event.pageY - canvas.offsetTop,
		};
	};

	const drawLine = (
		originalMousePosition: Coordinate,
		newMousePosition: Coordinate
	) => {
		if (!canvasRef.current) {
			return;
		}
		const canvas: HTMLCanvasElement = canvasRef.current;
		const context = canvas.getContext("2d");

		if (context) {
			context.strokeStyle = color;
			context.lineJoin = "round";
			context.lineWidth = width;

			context.beginPath();

			context.moveTo(originalMousePosition.x, originalMousePosition.y);
			context.lineTo(newMousePosition.x, newMousePosition.y);
			context.closePath();

			context.stroke();
		}
	};

	const touch = useCallback((event: TouchEvent) => {
		event.preventDefault();
		if (!canvasRef.current) {
			return;
		}
		const canvas: HTMLCanvasElement = canvasRef.current;
		var touch = event.touches[0];
		var mouseEvent = new MouseEvent("mousemove", {
			clientX: touch.clientX,
			clientY: touch.clientY,
		});
		canvas.dispatchEvent(mouseEvent);
	}, []);
	const startTouch = useCallback((event: TouchEvent) => {
		event.preventDefault();

		if (!canvasRef.current) {
			return;
		}
		const canvas: HTMLCanvasElement = canvasRef.current;

		var touch = event.touches[0];
		var mouseEvent = new MouseEvent("mousedown", {
			clientX: touch.clientX,
			clientY: touch.clientY,
		});
		canvas.dispatchEvent(mouseEvent);
	}, []);

	const exitTouch = useCallback((event: TouchEvent) => {
		event.preventDefault();

		if (!canvasRef.current) {
			return;
		}
		const canvas: HTMLCanvasElement = canvasRef.current;
		var mouseEvent = new MouseEvent("mouseup", {});
		canvas.dispatchEvent(mouseEvent);
	}, []);

	const startPaint = useCallback((event: MouseEvent) => {
		const coordinates = getCoordinates(event);
		if (coordinates) {
			setIsPainting(true);
			setMousePosition(coordinates);
		}
	}, []);

	const paint = useCallback(
		(event: MouseEvent) => {
			event.preventDefault();
			event.stopPropagation();

			if (isPainting) {
				const newMousePosition = getCoordinates(event);
				if (mousePosition && newMousePosition) {
					drawLine(mousePosition, newMousePosition);
					setMousePosition(newMousePosition);
				}
			}
		},
		[isPainting, mousePosition]
	);

	const exitPaint = useCallback(() => {
		setIsPainting(false);
	}, []);

	useEffect(() => {
		if (!canvasRef.current) {
			return;
		}

		if (isPainting) {
			setFlag(true);
		} else if (!isPainting && flag) {
			setFlag(false);

			const canvas: HTMLCanvasElement = canvasRef.current;
			const context = canvas.getContext("2d");
			const readImag: any = context?.getImageData(
				0,
				0,
				windowSize.width - 100,
				windowSize.height - 200
			);

			if (readImag) {
				imgdata.push(readImag);
				handler(imgdata);
			}
		}
	}, [flag, isPainting]);
	useEffect(() => {
		if (statePaint) {
			if (!canvasRef.current) {
				return;
			}
			const canvas: HTMLCanvasElement = canvasRef.current;
			const context = canvas.getContext("2d");

			imgdata.map((data) => {
				context?.putImageData(data, 0, 0);
			});

			settstatePaint(false);
		}
	});

	const [windowSize, setwindowSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	const handleResize = () => {
		setwindowSize({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	};

	useEffect(() => {
		if (!canvasRef.current) {
			return;
		}
		const canvas: HTMLCanvasElement = canvasRef.current;

		canvas.addEventListener("mousedown", startPaint);
		canvas.addEventListener("mousemove", paint);
		canvas.addEventListener("mouseup", exitPaint);
		canvas.addEventListener("mouseleave", exitPaint);

		canvas.addEventListener("touchstart", startTouch);
		canvas.addEventListener("touchmove", touch);
		canvas.addEventListener("touchend", exitTouch);

		window.addEventListener("resize", handleResize);

		return () => {
			canvas.removeEventListener("mousedown", startPaint);
			canvas.removeEventListener("mousemove", paint);
			canvas.removeEventListener("mouseup", exitPaint);
			canvas.removeEventListener("mouseleave", exitPaint);

			canvas.removeEventListener("touchstart", startTouch);
			canvas.removeEventListener("touchmove", touch);
			canvas.removeEventListener("touchend", exitTouch);
			window.removeEventListener("resize", handleResize);
		};
	}, [startPaint, paint, exitPaint]);

	const onColorClick = (e: any) => {
		return setColor(e.target.id);
	};
	const onWidthClick = (e: any) => {
		return setWidth(e.target.value);
	};

	const onSaveClick = async () => {
		if (!canvasRef.current) {
			return;
		}
		const canvas: HTMLCanvasElement = canvasRef.current;

		let imgDataUrl = canvas.toDataURL("image/png");
		let blobBin = atob(imgDataUrl.split(",")[1]);
		let arr = [];
		for (let cnt = 0; cnt < blobBin.length; cnt++) {
			arr.push(blobBin.charCodeAt(cnt));
		}
		console.log("arr", arr);
		let file = new Blob([new Uint8Array(arr)], { type: "image/png" });
		let formdata = new FormData();
		formdata.append("file", file);

		const { uploadURL } = await (await fetch(`/api/upload/files`)).json();

		if (uploadURL) {
			const {
				result: { id },
			} = await (
				await fetch(uploadURL, { method: "POST", body: formdata })
			).json();
		}
	};
	const onClear = () => {
		if (!canvasRef.current) {
			return;
		}
		const canvas: HTMLCanvasElement = canvasRef.current;
		const context = canvas.getContext("2d");
		context?.clearRect(0, 0, windowSize.width - 100, windowSize.height - 200);

		handler([]);
	};
	const onUndo = () => {
		imgdata.pop();

		if (!canvasRef.current) {
			return;
		}
		const canvas: HTMLCanvasElement = canvasRef.current;
		const context = canvas.getContext("2d");

		if (imgdata.length) {
			context?.putImageData(imgdata[imgdata.length - 1], 0, 0);
		} else {
			context?.clearRect(0, 0, windowSize.width - 100, windowSize.height - 200);
		}

		//console.log(imgdata, imgdata.length);
		handler(imgdata);
	};

	return (
		<div className="relative  right top-20">
			<div className="absolute    sm:right-2  z-20 px-2 flex items-center">
				<div className="flex items-center flex-col sm:flex-row ">
					<div className="flex items-center mt-2">
						<button
							className="  mx-1 rounded-full w-5 h-5 bg-blue-500"
							id="blue"
							onClick={onColorClick}
						></button>
						<button
							className="  mx-1 rounded-full w-5 h-5 bg-white border border-black"
							id="white"
							onClick={onColorClick}
						></button>
						<button
							className="  mx-1 rounded-full w-5 h-5 bg-green-500"
							id="green"
							onClick={onColorClick}
						></button>
						<button
							className="  mx-1 rounded-full w-5 h-5 bg-black"
							id="black"
							onClick={onColorClick}
						></button>
					</div>
					<input
						onChange={onWidthClick}
						type="range"
						min="1"
						max="101"
						step="5"
						className="mx-4 mt-4 sm:mt-0"
					/>
				</div>

				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="cursor-pointer h-5 w-5 mx-4"
					viewBox="0 0 20 20"
					fill="currentColor"
					onClick={onUndo}
				>
					<path
						fillRule="evenodd"
						d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
						clipRule="evenodd"
					/>
				</svg>

				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="cursor-pointer  h-5 w-5 mx-4"
					viewBox="0 0 20 20"
					fill="currentColor"
					onClick={onClear}
				>
					<path
						fillRule="evenodd"
						d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
						clipRule="evenodd"
					/>
				</svg>

				<button
					onClick={onSaveClick}
					className="px-4 py-2 bg-black text-white rounded-2xl ml-2"
				>
					저장
				</button>
			</div>

			<canvas
				ref={canvasRef}
				width={windowSize.width - 100}
				height={windowSize.height - 200}
				className="fixed   right-0 z-10 outline bg-white rounded-2xl"
			/>
		</div>
	);
};

export default Paint;

function debounce(arg0: () => void) {
	throw new Error("Function not implemented.");
}
/*

<button
					className="  mx-1 rounded-full w-5 h-5 bg-blue-500"
					id="blue"
					onClick={onColorClick}
				></button>
				<button
					className="  mx-1 rounded-full w-5 h-5 bg-white border border-black"
					id="white"
					onClick={onColorClick}
				></button>
				<button
					className="  mx-1 rounded-full w-5 h-5 bg-green-500"
					id="green"
					onClick={onColorClick}
				></button>
				<button
					className="  mx-1 rounded-full w-5 h-5 bg-black"
					id="black"
					onClick={onColorClick}
				></button>
				<input
					onChange={onWidthClick}
					type="range"
					min="1"
					max="101"
					step="5"
					className="mx-4"
				/>

				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="cursor-pointer h-5 w-5 mx-4"
					viewBox="0 0 20 20"
					fill="currentColor"
					onClick={onUndo}
				>
					<path
						fillRule="evenodd"
						d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
						clipRule="evenodd"
					/>
				</svg>

				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="cursor-pointer  h-5 w-5 mx-4"
					viewBox="0 0 20 20"
					fill="currentColor"
					onClick={onClear}
				>
					<path
						fillRule="evenodd"
						d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
						clipRule="evenodd"
					/>
				</svg>

				<button
					onClick={onSaveClick}
					className="px-4 py-2 bg-black text-white rounded-2xl ml-20"
				>
					저장
				</button>
*/
