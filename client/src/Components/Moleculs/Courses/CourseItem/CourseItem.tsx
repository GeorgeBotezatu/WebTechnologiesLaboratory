import "./CourseItem.scss";
import React from "react";
import { useSelector } from "react-redux";
import { ICoursesListItem } from "../../../../Interfaces";
import { RootState } from "../../../../Store/Store";

const CourseItem: React.FC<ICoursesListItem> = ({
	courseDescription,
	courseTitle,
	_id,
}) => {
	const { isAdmin } = useSelector((state: RootState) => state.auth);

	const componentClass = "wtl-course-item";
	const courseTitleClass = `${componentClass}--title`;
	const courseDescriptionClass = `${componentClass}--description`;
	const courseUserButtonClass = `${componentClass}--user-button`;
	const courseAdminButtonClass = `${componentClass}--admin-button`;
	return (
		<div className={componentClass}>
			<h2 className={courseTitleClass}>{courseTitle}</h2>
			<p className={courseDescriptionClass}>
				{courseDescription}This is an introductive course about HTML here you
				will find all basic stuff needed to start your journeyThis is an i
			</p>
			<button type="button" className={courseUserButtonClass}>
				Enroll
			</button>
			{isAdmin && (
				<button type="button" className={courseAdminButtonClass}>
					Edit Course
				</button>
			)}
		</div>
	);
};

export default CourseItem;
