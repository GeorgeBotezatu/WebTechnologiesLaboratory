import "./CourseChapterView.scss";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../Store/Store";
import MDEditor from "@uiw/react-md-editor";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
	profileChapterCompletionFail,
	profileChapterCompletionInit,
	profileChapterCompletionSuccess,
} from "../../../../Store/features/profileSlice";
import {
	ALREADY_COMPLETED,
	CAN_NOT_COMPLETE_CHAPTER,
	YOU_ARE_NOT_ENROLED,
} from "../../../../Utils/constants";
import { completeCourseChapter } from "../../../../API/profileAPI";

const CourseChapterView: React.FC = () => {
	const { course } = useSelector((state: RootState) => state.course);
	const { userProfile } = useSelector((state: RootState) => state.userProfile);
	const { chapterId, courseId } = useParams();
	const dispatch = useDispatch();
	const componentClass = "wtl-course-chapter-view";
	const courseContentClass = `${componentClass}__course-content`;
	const titleClass = `${courseContentClass}--title`;
	const quizConoleClass = `${courseContentClass}__quiz-console`;
	const goToConsoleClass = `${quizConoleClass}--go-to`;
	const contentClass = `${courseContentClass}--content`;
	const directionButtonsClass = `${courseContentClass}__direction-buttons`;

	const completeChapterHandler = async () => {
		try {
			dispatch(profileChapterCompletionInit());
			let enrolledCourseIndex = -1;
			if (userProfile && userProfile.enroledCourses)
				for (let i = 0; i < userProfile?.enroledCourses?.length; i++) {
					if (userProfile.enroledCourses[i].courseId === courseId)
						enrolledCourseIndex = i;
				}

			if (enrolledCourseIndex === -1) {
				dispatch(profileChapterCompletionFail(YOU_ARE_NOT_ENROLED));
			}

			const course =
				userProfile.enroledCourses &&
				userProfile.enroledCourses[enrolledCourseIndex];

			if (course && course.completedChapters) {
				let foundChapter = false;
				for (let i = 0; i < course.completedChapters.length; i++) {
					if (course.completedChapters[i]._id === chapterId) {
						foundChapter = true;
						break;
					}
				}
				if (foundChapter) {
					dispatch(profileChapterCompletionFail(ALREADY_COMPLETED));
				} else {
					let res;
					if (courseId && chapterId)
						res = await completeCourseChapter(courseId, chapterId);
					if (!res) {
						dispatch(profileChapterCompletionFail(CAN_NOT_COMPLETE_CHAPTER));
					} else {
						dispatch(profileChapterCompletionSuccess(res));
					}
				}
			} else if (course) {
				let res;
				if (courseId && chapterId)
					res = await completeCourseChapter(courseId, chapterId);
				if (!res) {
					dispatch(profileChapterCompletionFail(CAN_NOT_COMPLETE_CHAPTER));
				} else {
					dispatch(profileChapterCompletionSuccess(res));
				}
			}
		} catch (error: any) {
			dispatch(profileChapterCompletionFail(error.message));
			console.log(error);
		}
	};

	return (
		<div className={componentClass}>
			{course &&
				course.chapters &&
				course.chapters.map((chapter, index) => {
					if (chapter._id === chapterId) {
						return (
							<div key={chapter._id} className={courseContentClass}>
								<h1 className={titleClass}>{chapter.chapterTitle}</h1>
								<div className={quizConoleClass}>
									<Link className={goToConsoleClass} to="/console">
										Go To Console
									</Link>
									{chapter.quiz && chapter.quiz?.length > 0 && (
										<Link
											className={goToConsoleClass}
											to={`/learning/course/${course._id}/chapter/${chapter._id}/quiz`}
										>
											Go to Quiz
										</Link>
									)}
								</div>
								<MDEditor.Markdown
									className={contentClass}
									style={{ padding: 20 }}
									source={chapter.content}
								/>
								<div className={directionButtonsClass}>
									{index >= 1 ? (
										<>
											<Link
												to={
													course.chapters
														? `/learning/course/${course._id}/chapter/${
																course.chapters[index - 1]._id
														  }`
														: `/learning/course/${course._id}`
												}
											>
												Previous Lesson
											</Link>
										</>
									) : (
										<></>
									)}
									{course.chapters && index < course.chapters?.length - 1 ? (
										<>
											<Link
												to={
													course.chapters
														? `/learning/course/${course._id}/chapter/${
																course.chapters[index + 1]._id
														  }`
														: `/learning/course/${course._id}`
												}
												onClick={() => {
													completeChapterHandler();
												}}
											>
												Next Lesson
											</Link>
										</>
									) : (
										<></>
									)}
								</div>
							</div>
						);
					} else {
						return "";
					}
				})}
		</div>
	);
};

export default CourseChapterView;
