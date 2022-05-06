import "./DashboardCourseEdit.scss";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ICourse } from "../../../../Interfaces";
import {
	courseLoadFail,
	courseLoadInit,
	courseLoadSuccess,
} from "../../../../Store/features/courseSlice";
import { loadCourse } from "../../../../API/coursesAPI";
import { CAN_NOT_LOAD_COURSE } from "../../../../Utils/constants";
import { RootState } from "../../../../Store/Store";
import { Link } from "react-router-dom";

const DashboardCourseEdit: React.FC = () => {
	const { courseId } = useParams();

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
	const componentClass = "wtl-dashboard-course-edit";
	const courseTitleClass = `${componentClass}--title`;
	const courseActionButtonsClass = `${componentClass}__course-buttons`;
	const chaptersContainerClass = `${componentClass}__chapters-container`;
	const chapterConatainerClass = `${chaptersContainerClass}__chapter`;
	const chapterInfoClass = `${chapterConatainerClass}--chapter-info`;
	const chapterActionButtonsClass = `${chapterConatainerClass}__chapter-buttons`;
	const deleteClass = `${chapterActionButtonsClass}--delete`;
	const editClass = `${chapterActionButtonsClass}--edit`;
	const createClass = `${chapterActionButtonsClass}--create`;
	return (
		<div className={componentClass}>
			<h1 className={courseTitleClass}> {course?.courseTitle}</h1>
			<div className={courseActionButtonsClass}>
				<Link to="/">Add a new chapter</Link>

				<Link to={`/learning/course/edit/${course?._id}`}>
					Edit cours Title & Description
				</Link>
			</div>
			<div className={chaptersContainerClass}>
				<h1>Chapters:</h1>
				{course?.chapters?.map((chapter) => {
					if (chapter.quiz) {
						if (chapter.quiz[0])
							return (
								<div key={chapter._id} className={chapterConatainerClass}>
									<p className={chapterInfoClass}>
										Chapter Order: <span>{chapter.order}</span> and Chapter
										Title: <span>{chapter.chapterTitle}</span>
									</p>
									<div className={chapterActionButtonsClass}>
										<button className={editClass}>Edit Chapter</button>
										<button className={editClass}>Edit Quiz</button>
										<button className={editClass}>Change chapter order</button>
										<button className={deleteClass}>Delete</button>
									</div>
								</div>
							);
						else {
							return (
								<div key={chapter._id} className={chapterConatainerClass}>
									<p className={chapterInfoClass}>
										Chapter Order: <span>{chapter.order}</span> and Chapter
										Title: <span>{chapter.chapterTitle}</span>
									</p>
									<div className={chapterActionButtonsClass}>
										<button className={editClass}>Edit Chapter</button>
										<button className={createClass}>Create Quiz</button>
										<button className={editClass}>Change chapter order</button>
										<button className={deleteClass}>Delete</button>
									</div>
								</div>
							);
						}
					}
				})}
			</div>
		</div>
	);
};

export default DashboardCourseEdit;
