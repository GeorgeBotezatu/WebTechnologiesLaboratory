import "./LearningPathPage.scss";
import React from "react";
import CourseItem from "../../Moleculs/Courses/CourseItem/CourseItem";
import { useSelector } from "react-redux";
import { RootState } from "../../../Store/Store";

const LearningPathPage: React.FC = () => {
	const { coursesList } = useSelector((state: RootState) => state.coursesList);
	const componentClass = "wtl-learning-path-page";
	const coursesContainerClass = `${componentClass}__container`;
	return (
		<div className={componentClass}>
			<div className={coursesContainerClass}>
				{coursesList &&
					coursesList.map((course) => {
						return (
							<CourseItem
								courseTitle={course.courseTitle}
								courseDescription={course.courseDescription}
								_id={course._id}
								key={course._id}
							/>
						);
					})}
			</div>
		</div>
	);
};

export default LearningPathPage;
