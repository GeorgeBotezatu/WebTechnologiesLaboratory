import "./CourseChapterView.scss";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Store/Store";
import MDEditor from "@uiw/react-md-editor";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const CourseChapterView: React.FC = () => {
	const { course } = useSelector((state: RootState) => state.course);
	const { chapterId } = useParams();
	const componentClass = "wtl-course-chapter-view";
	const courseContentClass = `${componentClass}__course-content`;
	const titleClass = `${courseContentClass}--title`;
	const goToConsoleClass = `${courseContentClass}--go-to`;
	const contentClass = `${courseContentClass}--content`;
	const directionButtonsClass = `${courseContentClass}__direction-buttons`;
	return (
		<div className={componentClass}>
			{course &&
				course.chapters &&
				course.chapters.map((chapter, index) => {
					if (chapter._id === chapterId) {
						return (
							<div key={chapter._id} className={courseContentClass}>
								<h1 className={titleClass}>{chapter.chapterTitle}</h1>
								<Link className={goToConsoleClass} to="/console">
									Go To Console
								</Link>
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
