import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateGithub } from "../../../API/profileAPI";
import {
	profileGithubFail,
	profileGithubInit,
	profileGithubSuccess,
} from "../../../Store/features/profileSlice";
interface IEditableInput {
	type: string;
	text: string;
	placeholder: string;
	children: JSX.Element;
	childRef: React.MutableRefObject<HTMLInputElement>;
}
const EditableTextField: React.FC<IEditableInput> = ({
	text,
	type,
	placeholder,
	children,
	childRef,
	...props
}) => {
	const [isEditing, setEditing] = useState(false);
	const dispatch = useDispatch();
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
		}
	};

	const onClickHandler = () => {
		setEditing(false);
		dispatch(profileGithubInit());
		if (text) {
			try {
				updateGithub(text);
				dispatch(profileGithubSuccess(text));
			} catch (error: any) {
				dispatch(profileGithubFail(error.message));
			}
		}
	};

	return (
		<section {...props}>
			{isEditing ? (
				<div onKeyDown={(e) => handleKeyDown(e, type)}>
					{children}
					<button
						onClick={() => {
							onClickHandler();
						}}
					>
						Save
					</button>
				</div>
			) : (
				<div onClick={() => setEditing(true)}>
					<span>{text || placeholder || "Editable content"}</span>
				</div>
			)}
		</section>
	);
};

export default EditableTextField;
