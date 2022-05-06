import "./DashboardLearningPath.scss";
import React from "react";

import DashboardCoursesList from "../../../Moleculs/Dashboard/DashboardCoursesList/DashboardCoursesList";
import { useParams } from "react-router";
import DashboardCourseEdit from "../../../Moleculs/Dashboard/DashboardCourseEdit/DashboardCourseEdit";

const DashboardLearningPath: React.FC = () => {
	const { courseId } = useParams();
	const componentClass = "wtl-dashboard-learning-path";
	const coursesListTitleClass = `${componentClass}--list-title`;
	return (
		<>
			{!courseId ? (
				<div className={componentClass}>
					{" "}
					<h1 className={coursesListTitleClass}>
						Courses list available on platform!
					</h1>
					<DashboardCoursesList />
				</div>
			) : (
				<div className={componentClass}>
					<DashboardCourseEdit />
				</div>
			)}
		</>
	);
};

export default DashboardLearningPath;
