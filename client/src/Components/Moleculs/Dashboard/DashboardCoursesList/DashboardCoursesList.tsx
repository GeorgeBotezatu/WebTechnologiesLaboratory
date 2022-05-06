import "./DashboardCoursesList.scss";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Store/Store";
import { Link } from "react-router-dom";

const DashboardCoursesList: React.FC = () => {
	const { coursesList } = useSelector((state: RootState) => state.coursesList);

	const componentClass = "wtl-dashboard-courses-list";
	const courseItemClass = `${componentClass}__course-item`;
	const courseItemActionButtonsClass = `${courseItemClass}__action-buttons`;
	return (
		<div className={componentClass}>
			{coursesList?.map((course) => {
				return (
					<div className={courseItemClass} key={course._id}>
						<p>{course.courseTitle}</p>
						<div className={courseItemActionButtonsClass}>
							<Link to={`course/${course._id}`}>Modify Course Structure</Link>
							<button type="button">Delete Course</button>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default DashboardCoursesList;
