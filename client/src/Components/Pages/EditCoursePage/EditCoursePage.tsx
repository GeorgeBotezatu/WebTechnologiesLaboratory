import "./EditCoursePage.scss";
import React from "react";
import EditCourseForm from "../../Moleculs/Courses/EditCourseForm/EditCourseForm";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../../Store/Store";

const EditCoursePage: React.FC = () => {
	const { id } = useParams();
	const { coursesList } = useSelector((state: RootState) => state.coursesList);

	const componentClass = "wtl-edit-course-page";
	const imageClass = `${componentClass}--image`;
	const titleClass = `${componentClass}--title`;
	return (
		<div>
			<div className={imageClass}></div>
			<h1 className={titleClass}>Edit course title and description</h1>
			{coursesList?.map((course) => {
				if (course._id === id) {
					return (
						<EditCourseForm
							key={course._id}
							courseTitle={course.courseTitle}
							courseDescription={course.courseDescription}
							_id={course._id}
						/>
					);
				}
			})}
		</div>
	);
};

export default EditCoursePage;
