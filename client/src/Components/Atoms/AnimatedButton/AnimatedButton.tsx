import "./AnimatedButton.scss";
import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

interface IAnimateButton {
	buttonColor: string;
	buttonDimension: string;
	buttonPosition: string;
	buttonMessage: string;
	buttonRoute: string;
}

const AnimatedButton: React.FC<IAnimateButton> = ({
	buttonColor,
	buttonDimension,
	buttonPosition,
	buttonMessage,
	buttonRoute,
}) => {
	const componentClass = "wtl-animated-button";
	const buttonContainerClass = `${componentClass}__button-container`;
	const masButtonContainerClass = `${componentClass}__mas-button-container`;

	// colors Modifiers
	const buttonColorClass = `${buttonContainerClass}--${buttonColor}`;
	const masColorClass = `${masButtonContainerClass}--${buttonColor}`;

	//dimension Modifiers
	const buttonDimensionClass = `${buttonContainerClass}--${buttonDimension}`;
	const masDimensionClass = `${masButtonContainerClass}--${buttonDimension}`;

	//position Modifiers
	const buttonPositionClass = `${buttonContainerClass}--${buttonPosition}`;
	const masPositionClass = `${masButtonContainerClass}--${buttonPosition}`;
	return (
		<div className={componentClass}>
			<div
				className={classNames(
					buttonContainerClass,
					buttonColorClass,
					buttonDimensionClass,
					buttonPositionClass
				)}
			>
				<Link to={buttonRoute}>{buttonMessage}</Link>
			</div>
			<div
				className={classNames(
					masButtonContainerClass,
					masColorClass,
					masDimensionClass,
					masPositionClass
				)}
			>
				<span>{buttonMessage}</span>
			</div>
		</div>
	);
};

export default AnimatedButton;
