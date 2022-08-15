import React, {
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

const Paint = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const [mousePosition, setMousePosition] =
		useState<Coordinate | undefined>(undefined);
	const [isPainting, setIsPainting] = useState(false);
	const [color, setColor] = useState("black");
	const [width, setWidth] = useState(3);

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
		const canvas: HTMLCanvasElement = canvasRef.current;

		canvas.addEventListener("mousedown", startPaint);
		canvas.addEventListener("mousemove", paint);
		canvas.addEventListener("mouseup", exitPaint);
		canvas.addEventListener("mouseleave", exitPaint);

		canvas.addEventListener("touchstart", startTouch);
		canvas.addEventListener("touchmove", touch);
		canvas.addEventListener("touchend", exitTouch);

		return () => {
			canvas.removeEventListener("mousedown", startPaint);
			canvas.removeEventListener("mousemove", paint);
			canvas.removeEventListener("mouseup", exitPaint);
			canvas.removeEventListener("mouseleave", exitPaint);

			canvas.removeEventListener("touchstart", startTouch);
			canvas.removeEventListener("touchmove", touch);
			canvas.removeEventListener("touchend", exitTouch);
		};
	}, [startPaint, paint, exitPaint]);

	const onColorClick = (e: any) => {
		return setColor(e.target.id);
	};
	const onWidthClick = (e: any) => {
		console.log("value", e.target.value);
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

			console.log(id);
		}
	};

	return (
		<div className="relative  right-0 ">
			<div className="absolute  top-24 right-60  z-20 ">
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
				<button
					onClick={onSaveClick}
					className="px-4 py-2 bg-black text-white rounded-2xl"
				>
					저장
				</button>
			</div>

			<canvas
				ref={canvasRef}
				width="600"
				height="600"
				className="absolute right-0 top-20 z-10 rounded-xl outline bg-white mr-2 "
			/>
		</div>
	);
};

export default Paint;
