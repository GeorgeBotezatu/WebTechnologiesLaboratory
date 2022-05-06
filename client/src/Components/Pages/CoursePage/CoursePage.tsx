import "./CoursePage.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	courseLoadFail,
	courseLoadInit,
	courseLoadSuccess,
} from "../../../Store/features/courseSlice";
import { loadCourse } from "../../../API/coursesAPI";
import { CAN_NOT_LOAD_COURSE } from "../../../Utils/constants";
import { useParams } from "react-router";
import CourseSideBar from "../../Moleculs/Courses/CourseSideBar/CourseSideBar";
import CourseChapterView from "../../Moleculs/Courses/CourseChapterView/CourseChapterView";
import CourseLanding from "../../Moleculs/Courses/CourseLanding/CourseLanding";
import { ICourse } from "../../../Interfaces";
import { RootState } from "../../../Store/Store";

const CoursePage: React.FC = () => {
	const { courseId, chapterId } = useParams();

	const dispatch = useDispatch();
	useEffect(() => {
		let res: ICourse;
		const loadCourseHandler = async () => {
			dispatch(courseLoadInit());
			try {
				if (courseId) res = (await loadCourse(courseId)) as ICourse;
				if (!res) {
					dispatch(courseLoadFail(CAN_NOT_LOAD_COURSE));
				}
				dispatch(courseLoadSuccess(res));
			} catch (error: any) {
				console.log(error);
				dispatch(courseLoadFail(error.message));
			}
		};
		loadCourseHandler();
	}, [courseId, dispatch]);

	const { course } = useSelector((state: RootState) => state.course);

	const componentClass = "wtl-course-page";
	const sidebarContainerClass = `${componentClass}__sidenav-container`;
	const courseContainerClass = `${componentClass}__course-container`;
	return (
		<div className={componentClass}>
			<div className={sidebarContainerClass}>
				<CourseSideBar />
			</div>
			<div className={courseContainerClass}>
				{chapterId ? (
					<CourseChapterView />
				) : (
					<CourseLanding
						courseTitle={course?.courseTitle}
						courseDescription={course?.courseDescription}
					/>
				)}
			</div>
		</div>
	);
};

export default CoursePage;
