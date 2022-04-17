import "./DropDownMenu.scss";
import React, { useState } from "react";
import classNames from "classnames";
import { RootState } from "../../../Store/Store";
import { useDispatch, useSelector } from "react-redux";
import {
	profileUpdateCodeSavesFail,
	profileUpdateCodeSavesInit,
	profileUpdateCodeSavesSuccess,
} from "../../../Store/features/profileSlice";
import {
	createConsole,
	IConsoleData,
	updateConsole,
} from "../../../API/consoleAPI";
import { CAN_NOT_UPDATE_CREATE_CONSOLE } from "../../../Utils/constants";
import { useNavigate } from "react-router";

interface IDorpDownMenu {
	currentColor: boolean;
	onChange(value: boolean): void;
	id?: string;
	consoleName: string;
	js: string;
	css: string;
	html: string;
}

const DropDownMenu: React.FC<IDorpDownMenu> = ({
	currentColor,
	onChange,
	id,
	consoleName,
	js,
	css,
	html,
}) => {
	const { isAuthenticated } = useSelector((state: RootState) => state.auth);
	const [toggle, setToggle] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const clickHandler = () => {
		setToggle(!toggle);
	};
	const consoleData = {
		name: consoleName,
		html: html,
		css: css,
		js: js,
	};
	const saveHandler = async (consoleData: IConsoleData) => {
		dispatch(profileUpdateCodeSavesInit());
		try {
			const res = await createConsole(consoleData);
			if (!res) {
				dispatch(profileUpdateCodeSavesFail(CAN_NOT_UPDATE_CREATE_CONSOLE));
			} else {
				dispatch(profileUpdateCodeSavesSuccess(res));
				navigate("/profile");
			}
		} catch (error: any) {
			dispatch(profileUpdateCodeSavesFail(error.message));
		}
	};
	const updateHandler = async (consoleData: IConsoleData) => {
		dispatch(profileUpdateCodeSavesInit());
		try {
			let res;
			if (id) {
				res = await updateConsole(consoleData, id);
			} else {
				dispatch(profileUpdateCodeSavesFail(CAN_NOT_UPDATE_CREATE_CONSOLE));
			}
			if (!res) {
				dispatch(profileUpdateCodeSavesFail(CAN_NOT_UPDATE_CREATE_CONSOLE));
			} else {
				dispatch(profileUpdateCodeSavesSuccess(res));
				navigate("/profile");
			}
		} catch (error: any) {
			dispatch(profileUpdateCodeSavesFail(error.message));
		}
	};

	const componentClass = "wtl-drop-down";
	const dropDownButtonClass = `${componentClass}--button`;
	const dropDownContentContainterClass = `${componentClass}__content-container`;
	const dropDownItemClass = `${dropDownContentContainterClass}--item`;
	const disabledClass = `${dropDownContentContainterClass}--disabled`;

	return (
		<>
			<div className={componentClass}>
				<i
					onClick={() => {
						clickHandler();
					}}
					className={classNames("fa-solid fa-ellipsis", dropDownButtonClass)}
				></i>
				<div
					className={
						toggle
							? classNames(dropDownContentContainterClass, "active")
							: dropDownContentContainterClass
					}
				>
					<button
						type="button"
						className={
							isAuthenticated && id != null ? dropDownItemClass : disabledClass
						}
						onClick={() => {
							updateHandler(consoleData);
						}}
					>
						Update
					</button>
					<button
						onClick={() => {
							saveHandler(consoleData);
						}}
						type="button"
						className={isAuthenticated ? dropDownItemClass : disabledClass}
					>
						SaveOnProfile
					</button>
					<button
						type="button"
						className={dropDownItemClass}
						onClick={() => {
							onChange(!currentColor);
						}}
					>
						{currentColor ? "White Mode" : "Dark Mode"}
					</button>
				</div>
			</div>
		</>
	);
};

export default DropDownMenu;
