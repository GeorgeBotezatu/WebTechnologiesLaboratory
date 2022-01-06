import "./EditableTextField.scss";
import React, { useEffect, useState } from "react";
import editImage from "../../../Assets/Icons/edit-pencil-icon.svg";
import checkImage from "../../../Assets/Icons/check-icon.svg";

interface IEditableInput {
	type: string;
	text: string;
	placeholder: string;
	children: JSX.Element;
	childRef: React.MutableRefObject<HTMLInputElement>;
	updateFunction: (text: string) => void;
}
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
		const keys = ["Escape", "Tab"];
		const enterKey = "Enter";
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
						<img src={checkImage} alt="edit-image" />
					</button>
				</div>
			) : (
				<div className={staticContainerClass} onClick={() => setEditing(true)}>
					<span>{text || placeholder || "Editable content"}</span>
					<img src={editImage} alt="edit-image" />
				</div>
			)}
		</section>
	);
};

export default EditableTextField;
