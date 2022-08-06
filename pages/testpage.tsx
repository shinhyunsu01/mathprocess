import React from "react";
//import styles from "../styles/EnterBack.css";
const Testpage = () => {
	return (
		<>
			<div className="container">
				<div className="particle"></div>
				<div className="particle"></div>
				<div className="particle"></div>
				<div className="particle"></div>
				<div className="particle"></div>
			</div>
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
                        0 0  0  30 -15"
						/>
						<feBlend in="SourceGraphic" />
					</filter>
				</defs>
			</svg>
		</>
	);
};

export default Testpage;
/*

*/
