import "./EducationItem.scss";
import React from "react";
import GearButton from "../../../Atoms/GearButton/GearButton";
import { Link } from "react-router-dom";
import TrashButton from "../../../Atoms/TrashButton/TrashButton";
import moment from "moment";
import {
	profileDeleteEduFail,
	profileDeleteEduInit,
	profileDeleteEduSuccess,
} from "../../../../Store/features/profileSlice";
import { useDispatch } from "react-redux";
import { EDUCATION_DOSENT_EXIST } from "../../../../Utils/constants";
import { deleteEdu } from "../../../../API/profileAPI";

interface IEducationCard {
	school?: string;
	current?: boolean;
	description?: string;
	from?: Date;
	degree?: string;
	fieldofstudy?: string;
	to?: string | Date;
	_id?: string;
	index: number;
	numberOfItems: number;
}

const EducationItem: React.FC<IEducationCard> = ({
	school,
	current,
	description,
	from,
	to,
	degree,
	fieldofstudy,
	index,
	numberOfItems,
	_id,
}) => {
	const dispatch = useDispatch();

	const deleteHandler = async () => {
		dispatch(profileDeleteEduInit());
		try {
			if (_id) {
				const res = await deleteEdu(_id);
				if (!res) {
					dispatch(profileDeleteEduFail(EDUCATION_DOSENT_EXIST));
				} else {
					dispatch(profileDeleteEduSuccess(res));
				}
			} else {
				dispatch(profileDeleteEduFail(EDUCATION_DOSENT_EXIST));
			}
		} catch (error) {
			dispatch(profileDeleteEduFail(error));
		}
	};

	const componentClass = "wtl-education-item-container";
	const titleRowContainerClass = `${componentClass}__title-container`;
	const buttonsContainerClass = `${titleRowContainerClass}__buttons-container`;
	const editButtonClass = `${buttonsContainerClass}--edit`;
	const deleteButtonClass = `${buttonsContainerClass}--delete`;
	const infoContainerClass = `${componentClass}__info-container`;
	const fieldofstudyClass = `${componentClass}--fieldofstudy`;
	const degreeClass = `${infoContainerClass}--degree`;
	const dateClass = `${infoContainerClass}--date`;
	const descriptionContainerClass = `${componentClass}__description-container`;
	const descriptionTitleClass = `${descriptionContainerClass}--title`;
	const descriptionTextClass = `${descriptionContainerClass}--text`;
	return (
		<div className={componentClass}>
			<div className={titleRowContainerClass}>
				<h2>{school}</h2>
				<div className={buttonsContainerClass}>
					<Link
						to={`edit-education/${_id}`}
						state={{
							school: school,
							degree: degree,
							description: description,
							fieldofstudy: fieldofstudy,
							from: from,
							to: to,
							current: current,
							buttonPressed: true,
						}}
						className={editButtonClass}
						aria-label="edit-button"
					>
						<GearButton />
					</Link>
					<button
						onClick={() => {
							deleteHandler();
						}}
						className={deleteButtonClass}
						aria-label="delete-button"
					>
						<TrashButton />
					</button>
				</div>
			</div>
			<div className={infoContainerClass}>
				<p className={degreeClass}>
					Degree or instructor name: <span>{degree}</span>
				</p>
				<p className={dateClass}>
					<span>Between: {moment(from).format("DD.MM.YYYY")}</span> -
					{current ? (
						<span> now</span>
					) : (
						<span> {moment(to).format("DD.MM.YYYY")}</span>
					)}
				</p>
			</div>
			<p className={fieldofstudyClass}>
				<span> In {fieldofstudy}</span>
			</p>
			<div className={descriptionContainerClass}>
				{description ? (
					<>
						<p className={descriptionTitleClass}>Desciption:</p>
						<p className={descriptionTextClass}>{description}</p>
					</>
				) : (
					""
				)}
			</div>
			{numberOfItems !== index + 1 ? <hr /> : null}
		</div>
	);
};

export default EducationItem;
