import "./CoursePage.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	courseLoadFail,
	courseLoadInit,
	courseLoadSuccess,
} from "../../../Store/features/courseSlice";
import { loadCourse } from "../../../API/coursesAPI";
import { CAN_NOT_LOAD_COURSE, QUIZ } from "../../../Utils/constants";
import { useParams } from "react-router";
import CourseSideBar from "../../Moleculs/Courses/CourseSideBar/CourseSideBar";
import CourseChapterView from "../../Moleculs/Courses/CourseChapterView/CourseChapterView";
import CourseLanding from "../../Moleculs/Courses/CourseLanding/CourseLanding";
import { ICourse } from "../../../Interfaces";
import { RootState } from "../../../Store/Store";
import CourseQuizView from "../../Moleculs/Courses/CourseQuizView/CourseQuizView";

const CoursePage: React.FC = () => {
	const { courseId, chapterId, quiz } = useParams();

	const dispatch = useDispatch();
	useEffect(() => {
		let res: ICourse;
		const loadCourseHandler = async () => {
			dispatch(courseLoadInit());
			try {
				if (courseId) res = (await loadCourse(courseId)) as ICourse;
				if (!res) {
					dispatch(courseLoadFail(CAN_NOT_LOAD_COURSE));
				} else {
					dispatch(courseLoadSuccess(res));
				}
			} catch (error: any) {
				console.log(error);
				dispatch(courseLoadFail(error.message));
			}
		};
		if (courseId) loadCourseHandler();
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
				{chapterId && !quiz ? (
					<CourseChapterView />
				) : chapterId && quiz === QUIZ ? (
					<CourseQuizView
						chapter={course?.chapters?.filter((item) => item._id === chapterId)}
					/>
				) : (
					<CourseLanding
						courseTitle={course?.courseTitle}
						courseDescription={course?.courseDescription}
						firstChapterId={
							course?.chapters && course.chapters.length > 0
								? course.chapters[0]._id
								: false
						}
					/>
				)}
			</div>
		</div>
	);
};

export default CoursePage;
