import "./DashboardCoursesList.scss";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../Store/Store";
import { Link } from "react-router-dom";
import {
	coursesListDeleteFail,
	coursesListDeleteInit,
	coursesListDeleteSuccess,
} from "../../../../Store/features/coursesSlice";
import { ICoursesList } from "../../../../Interfaces";
import { deleteCourse } from "../../../../API/coursesAPI";
import { CAN_NOT_DELETE_COURSE } from "../../../../Utils/constants";
import { NEW_COURSE_PATH } from "../../../../Routes/routesPath";

const DashboardCoursesList: React.FC = () => {
	const { coursesList } = useSelector((state: RootState) => state.coursesList);
	const dispatch = useDispatch();
	const deleteCourseHandler = async (courseId: string) => {
		try {
			dispatch(coursesListDeleteInit());
			let res;
			if (courseId) res = (await deleteCourse(courseId)) as ICoursesList;
			if (!res) {
				dispatch(coursesListDeleteFail(CAN_NOT_DELETE_COURSE));
			} else {
				dispatch(coursesListDeleteSuccess(res));
			}
		} catch (error: any) {
			dispatch(coursesListDeleteFail(error.message));
			console.log(error);
		}
	};

	const componentClass = "wtl-dashboard-courses-list";
	const courseItemClass = `${componentClass}__course-item`;
	const addCourseBtnClass = `${componentClass}--link`;
	const courseItemActionButtonsClass = `${courseItemClass}__action-buttons`;
	return (
		<>
			<Link
				className={addCourseBtnClass}
				to={NEW_COURSE_PATH}
				state={{ newCourse: true }}
			>
				Add new course
			</Link>
			<div className={componentClass}>
				{coursesList?.map((course) => {
					return (
						<div className={courseItemClass} key={course._id}>
							<p>{course.courseTitle}</p>
							<div className={courseItemActionButtonsClass}>
								<Link to={`course/${course._id}`}>Modify Course Structure</Link>
								<button
									onClick={() => {
										course._id && deleteCourseHandler(course._id);
									}}
									type="button"
								>
									Delete Course
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default DashboardCoursesList;
