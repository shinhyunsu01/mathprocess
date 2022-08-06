import React from "react";

const Bubble = () => {
	return (
		<div className="w-full h-full">
			<div className="container">
				<div className="particle"></div>
				<div className="particle"></div>
				<div className="particle"></div>
				<div className="particle"></div>

				<div className="particle"></div>
				<div className="particle"></div>
				<div className="particle"></div>
				<div className="particle"></div>
				<div className="particle"></div>

				<div className="particle"></div>
				<div className="particle"></div>
				<div className="particle"></div>
				<div className="particle"></div>
				<div className="particle"></div>
				<div className="bubbleborder"></div>
				<div className="bubbleborder"></div>
				<svg>
					<defs>
						<filter id="goo">
							<feGaussianBlur in="SourceGraphic" stdDeviation="10" />
							<feColorMatrix
								in="name"
								mode="matrix"
								values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 30 -15"
							/>
							<feBlend in="SourceGraphic" />
						</filter>
					</defs>
				</svg>
			</div>
		</div>
	);
};

export default Bubble;
/*s
 */
