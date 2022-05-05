import "./CourseItem.scss";
import React from "react";
import { useSelector } from "react-redux";
import { ICoursesListItem } from "../../../../Interfaces";
import { RootState } from "../../../../Store/Store";
import { Link } from "react-router-dom";

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
			<Link to={`course/${_id}`} className={courseUserButtonClass}>
				Enroll
			</Link>
			{isAdmin && (
				<Link to={`course/edit/${_id}`} className={courseAdminButtonClass}>
					Edit Course
				</Link>
			)}
		</div>
	);
};

export default CourseItem;
