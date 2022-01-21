import "./ExperienceItem.scss";
import React from "react";
import TrashButton from "../../../Atoms/TrashButton/TrashButton";
import GearButton from "../../../Atoms/GearButton/GearButton";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
	profileDeleteExpFail,
	profileDeleteExpInit,
	profileDeleteExpSuccess,
} from "../../../../Store/features/profileSlice";
import { deleteExp } from "../../../../API/profileAPI";
import { EXPERIENCE_DOSENT_EXIST } from "../../../../Utils/constants";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
interface IExperienceCard {
	company?: string;
	current?: boolean;
	description?: string;
	from?: Date;
	location?: string;
	title?: string;
	to?: string | Date;
	_id?: string;
	index: number;
	numberOfItems: number;
}
const ExperienceItem: React.FC<IExperienceCard> = ({
	company,
	current,
	description,
	from,
	location,
	title,
	to,
	index,
	numberOfItems,
	_id,
}) => {
	const dispatch = useDispatch();

	const deleteHandler = async () => {
		dispatch(profileDeleteExpInit());
		try {
			if (_id) {
				const res = await deleteExp(_id);
				if (!res) {
					dispatch(profileDeleteExpFail(EXPERIENCE_DOSENT_EXIST));
				}
				dispatch(profileDeleteExpSuccess(res));
			} else {
				dispatch(profileDeleteExpFail(EXPERIENCE_DOSENT_EXIST));
			}
		} catch (error) {
			dispatch(profileDeleteExpFail(error));
		}
	};

	const componentClass = "wtl-experience-item-container";
	const titleRowContainerClass = `${componentClass}__title-container`;
	const buttonsContainerClass = `${titleRowContainerClass}__buttons-container`;
	const editButtonClass = `${buttonsContainerClass}--edit`;
	const deleteButtonClass = `${buttonsContainerClass}--delete`;
	const infoContainerClass = `${componentClass}__info-container`;
	const companyCityClass = `${infoContainerClass}--company-city`;
	const dateClass = `${infoContainerClass}--date`;
	const descriptionContainerClass = `${componentClass}__description-container`;
	const descriptionTitleClass = `${descriptionContainerClass}--title`;
	const descriptionTextClass = `${descriptionContainerClass}--text`;

	return (
		<div className={componentClass}>
			<div className={titleRowContainerClass}>
				<h2>{title}</h2>
				<div className={buttonsContainerClass}>
					<Link
						to={`edit-experience/${_id}`}
						state={{
							company: company,
							title: title,
							description: description,
							location: location,
							from: from,
							to: to,
							current: current,
						}}
						className={editButtonClass}
					>
						<GearButton />
					</Link>
					<button
						onClick={() => {
							deleteHandler();
						}}
						className={deleteButtonClass}
					>
						<TrashButton />
					</button>
				</div>
			</div>
			<div className={infoContainerClass}>
				<p className={companyCityClass}>
					At <span>{company}</span> in <span>{location}</span>
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
			<div className={descriptionContainerClass}>
				<p className={descriptionTitleClass}>Desciption:</p>
				<p className={descriptionTextClass}>{description}</p>
			</div>
			{numberOfItems !== index + 1 ? <hr /> : null}
		</div>
	);
};

export default ExperienceItem;
