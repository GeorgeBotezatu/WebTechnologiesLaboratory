import "./CodeItem.scss";
import React from "react";
import GoToButton from "../../../Atoms/GoToButton/GoToButton";
import TrashButton from "../../../Atoms/TrashButton/TrashButton";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
	profileDeleteCodeSavesFail,
	profileDeleteCodeSavesInit,
	profileDeleteCodeSavesSuccess,
} from "../../../../Store/features/profileSlice";
import { deleteCodeSaves } from "../../../../API/consoleAPI";
import { CONSOLE_DOSENT_EXIST } from "../../../../Utils/constants";

interface ICodeSave {
	name?: string;
	id?: string;
	html?: string;
	css?: string;
	js?: string;
}

const CodeItem: React.FC<ICodeSave> = ({ name, id, html, css, js }) => {
	const dispatch = useDispatch();
	const deleteHandler = async () => {
		dispatch(profileDeleteCodeSavesInit());
		try {
			if (id) {
				const res = await deleteCodeSaves(id);
				if (!res) {
					dispatch(profileDeleteCodeSavesFail(CONSOLE_DOSENT_EXIST));
				} else {
					dispatch(profileDeleteCodeSavesSuccess(res));
				}
			} else {
				dispatch(profileDeleteCodeSavesFail(CONSOLE_DOSENT_EXIST));
			}
		} catch (error) {
			dispatch(profileDeleteCodeSavesFail(error));
		}
	};

	const componentClass = "wtl-code-item-container";
	const titleClass = `${componentClass}--title`;
	const buttonsContainer = `${componentClass}__buttons`;
	return (
		<div className={componentClass}>
			<h2 className={titleClass}>{name}</h2>
			<div className={buttonsContainer}>
				<Link
					to={`/console/${id}`}
					state={{
						name: name,
						id: id,
						html: html,
						css: css,
						js: js,
					}}
				>
					<GoToButton />
				</Link>
				<button
					onClick={() => {
						deleteHandler();
					}}
					aria-label="delete-button"
				>
					<TrashButton />
				</button>
			</div>
		</div>
	);
};

export default CodeItem;
