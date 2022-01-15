import "./ExperienceItem.scss";
import React from "react";
import { spawn } from "child_process";
import TrashButton from "../../../Atoms/TrashButton/TrashButton";
import GearButton from "../../../Atoms/GearButton/GearButton";
import moment from "moment";
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
					<button className={editButtonClass}>
						<GearButton />
					</button>
					<button className={deleteButtonClass}>
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
