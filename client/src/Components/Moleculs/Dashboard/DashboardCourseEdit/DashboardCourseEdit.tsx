import "./DashboardCourseEdit.scss";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ICourse } from "../../../../Interfaces";
import {
	chapterDeleteFail,
	chapterDeleteInit,
	chapterDeleteSuccess,
	courseLoadFail,
	courseLoadInit,
	courseLoadSuccess,
} from "../../../../Store/features/courseSlice";
import { deleteChpater, loadCourse } from "../../../../API/coursesAPI";
import {
	CAN_NOT_DELETE_CHAPTER,
	CAN_NOT_LOAD_COURSE,
} from "../../../../Utils/constants";
import { RootState } from "../../../../Store/Store";
import { Link } from "react-router-dom";
import PopUpBox from "../../PopUpBox/PopUpBox";
import ChangeChapterOrder from "../ChangeChapterOrder/ChangeChapterOrder";

const DashboardCourseEdit: React.FC = () => {
	const { courseId } = useParams();

	const dispatch = useDispatch();
	const [buttonPopup, setButtonPopup] = useState<boolean>(false);
	const [oldOrder, setOldOrder] = useState<string>("");
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
		loadCourseHandler();
	}, [courseId, dispatch]);

	const deleteChapterHandler = async (chapterId: string) => {
		try {
			dispatch(chapterDeleteInit());
			let res;
			if (chapterId && courseId)
				res = (await deleteChpater(courseId, chapterId)) as ICourse;
			if (!res) {
				dispatch(chapterDeleteFail(CAN_NOT_DELETE_CHAPTER));
			} else {
				dispatch(chapterDeleteSuccess(res));
			}
		} catch (error: any) {
			dispatch(chapterDeleteFail(error.message));
			console.log(error);
		}
	};

	const { course } = useSelector((state: RootState) => state.course);
	const componentClass = "wtl-dashboard-course-edit";
	const courseTitleClass = `${componentClass}--title`;
	const courseActionButtonsClass = `${componentClass}__course-buttons`;
	const courseActionLinkClass = `${courseActionButtonsClass}--link`;
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
				<Link className={courseActionLinkClass} to="chapter">
					Add a new chapter
				</Link>

				<Link
					className={courseActionLinkClass}
					to={`/learning/course/edit/${course?._id}`}
					state={{ courseTitle: course?.courseTitle }}
				>
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
										<Link to={`chapter/${chapter._id}`} className={editClass}>
											Edit Chapter
										</Link>
										<Link
											to={`chapter/${chapter._id}/edit-quiz`}
											className={editClass}
										>
											Edit Quiz
										</Link>
										<button
											onClick={() => {
												if (chapter.order) setOldOrder(chapter.order);
												setButtonPopup(true);
											}}
											className={editClass}
										>
											Change chapter order
										</button>
										<button
											onClick={() => {
												chapter._id && deleteChapterHandler(chapter._id);
											}}
											className={deleteClass}
										>
											Delete
										</button>
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
										<Link to={`chapter/${chapter._id}`} className={editClass}>
											Edit Chapter
										</Link>
										<Link
											to={`chapter/${chapter._id}/create-quiz`}
											className={createClass}
										>
											Create Quiz
										</Link>
										<button
											onClick={() => {
												if (chapter.order) setOldOrder(chapter.order);
												setButtonPopup(true);
											}}
											className={editClass}
										>
											Change chapter order
										</button>
										<button
											onClick={() => {
												chapter._id && deleteChapterHandler(chapter._id);
											}}
											className={deleteClass}
										>
											Delete
										</button>
									</div>
								</div>
							);
						}
					} else {
						return "";
					}
				})}
			</div>
			<PopUpBox trigger={buttonPopup} setTrigger={setButtonPopup}>
				<ChangeChapterOrder
					oldOrder={oldOrder}
					totalNumber={course?.chapters?.length}
					chapterId={
						course?.chapters && course?.chapters[Number(oldOrder) - 1]
							? course?.chapters[Number(oldOrder) - 1]._id
							: ""
					}
					setTrigger={setButtonPopup}
				/>
			</PopUpBox>
		</div>
	);
};

export default DashboardCourseEdit;
