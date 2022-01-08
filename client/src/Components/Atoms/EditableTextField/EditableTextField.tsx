import "./EditableTextField.scss";
import React, { useEffect, useState } from "react";
import editImage from "../../../Assets/Icons/edit-pencil-icon.svg";
import checkImage from "../../../Assets/Icons/check-icon.svg";
import { ENTER_KEY, ESCAPE_KEY, TAB_KEY } from "../../../Utils/constants";
import { IEditableInput } from "../../../Interfaces";

const EditableTextField: React.FC<IEditableInput> = ({
	text,
	type,
	placeholder,
	children,
	childRef,
	updateFunction,
	...props
}) => {
	const [isEditing, setEditing] = useState(false);

	useEffect(() => {
		if (childRef && childRef.current && isEditing === true) {
			childRef.current.focus();
		}
	}, [isEditing, childRef]);

	const handleKeyDown = (
		event: React.KeyboardEvent<HTMLDivElement>,
		type: any
	) => {
		const { key } = event;
		const keys = [ESCAPE_KEY, TAB_KEY];
		const enterKey = ENTER_KEY;
		const allKeys = [...keys, enterKey];
		if (
			(type === "textarea" && keys.indexOf(key) > -1) ||
			(type !== "textarea" && allKeys.indexOf(key) > -1)
		) {
			setEditing(false);
			updateFunction(text);
		}
	};

	const onClickHandler = () => {
		setEditing(false);
		updateFunction(text);
	};

	const componentClass = "wtl-editable-field";
	const staticContainerClass = `${componentClass}__static-container`;
	const editableContainerClass = `${componentClass}__editable-container`;

	return (
		<section className={componentClass} {...props}>
			{isEditing ? (
				<div
					className={editableContainerClass}
					onKeyDown={(e) => handleKeyDown(e, type)}
				>
					{children}
					<button
						onClick={() => {
							onClickHandler();
						}}
					>
						<img src={checkImage} alt="check-icon" />
					</button>
				</div>
			) : (
				<div className={staticContainerClass} onClick={() => setEditing(true)}>
					<span>{text || placeholder}</span>
					<img src={editImage} alt="edit-icon" />
				</div>
			)}
		</section>
	);
};

export default EditableTextField;
