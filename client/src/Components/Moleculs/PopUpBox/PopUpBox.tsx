import "./PopUpBox.scss";

interface IPopUpBox {
	trigger: boolean;
	setTrigger: any;
}

const PopUpBox: React.FC<IPopUpBox> = ({ trigger, setTrigger, ...props }) => {
	const componentClass = "wtl-popup-box";
	const innerPopupClass = `wtl-inner-popup`;
	const closeBtnClass = `${innerPopupClass}--close-btn`;
	return (
		<>
			{trigger ? (
				<>
					<div
						className={componentClass}
						onClick={() => {
							setTrigger(false);
						}}
					></div>
					<div className={innerPopupClass}>
						<button
							onClick={() => {
								setTrigger(false);
							}}
							className={closeBtnClass}
						>
							x
						</button>
						{props.children}
					</div>
				</>
			) : (
				""
			)}
		</>
	);
};

export default PopUpBox;
