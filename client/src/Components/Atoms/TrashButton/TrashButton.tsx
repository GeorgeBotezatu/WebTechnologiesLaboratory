import "./TrashButton.scss";
import React from "react";

const TrashButton: React.FC = () => {
	const componentClass = "wtl-trash-button";
	return (
		<div className={componentClass}>
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g id="iconmonstr-trash-can-1 1">
					<path
						id="Trash"
						d="M3 6V24H21V6H3ZM8 20C8 20.552 7.552 21 7 21C6.448 21 6 20.552 6 20V10C6 9.448 6.448 9 7 9C7.552 9 8 9.448 8 10V20ZM13 20C13 20.552 12.552 21 12 21C11.448 21 11 20.552 11 20V10C11 9.448 11.448 9 12 9C12.552 9 13 9.448 13 10V20ZM18 20C18 20.552 17.552 21 17 21C16.448 21 16 20.552 16 20V10C16 9.448 16.448 9 17 9C17.552 9 18 9.448 18 10V20Z"
						fill="black"
					/>
					<path
						id="Top"
						d="M22 4V2H16.288C15.387 2 14.657 0.901 14.657 0H9.342C9.342 0.901 8.611 2 7.711 2H2V4H12H22Z"
						fill="black"
					/>
				</g>
			</svg>
		</div>
	);
};

export default TrashButton;
