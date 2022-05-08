import "./CourseSideBar.scss";
import React from "react";
import { RootState } from "../../../../Store/Store";
import { useSelector } from "react-redux";

import { NavLink } from "react-router-dom";

const CourseSideBar: React.FC = () => {
	const { course } = useSelector((state: RootState) => state.course);

	const componentClass = "wtl-course-side-bar";
	const sideBarLinkContainer = `${componentClass}__link-container`;

	return (
		<div className={componentClass}>
			<h2>{course?.courseTitle}</h2>
			{course?.chapters?.map((chapter) => {
				if (chapter.quiz) {
					if (chapter.quiz[0])
						return (
							<div className={sideBarLinkContainer} key={chapter._id}>
								<NavLink
									to={`/learning/course/${course._id}/chapter/${chapter._id}`}
								>
									{chapter.order}. {chapter.chapterTitle}
								</NavLink>
								<p>Quiz</p>
							</div>
						);
					else {
						return (
							<div className={sideBarLinkContainer} key={chapter._id}>
								<NavLink
									to={`/learning/course/${course._id}/chapter/${chapter._id}`}
								>
									{chapter.order}. {chapter.chapterTitle}
								</NavLink>
							</div>
						);
					}
				} else {
					return "";
				}
			})}
		</div>
	);
};

export default CourseSideBar;
