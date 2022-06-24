import "./EnrolledCourseItem.scss";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Store/Store";
import { Link } from "react-router-dom";

interface ICourseItem {
	courseId?: string;
	completedChapters?: number;
	numberOfChapters?: number;
}

const EnrolledCourseItem: React.FC<ICourseItem> = ({
	courseId,
	completedChapters,
	numberOfChapters,
}) => {
	const { coursesList } = useSelector((state: RootState) => state.coursesList);
	useEffect(() => {}, [coursesList]);

	const componentClass = "wtl-course-item-container";
	return (
		<>
			{coursesList &&
				coursesList?.map((item) => {
					if (item._id === courseId) {
						return (
							<Link
								className={componentClass}
								to={`/learning/course/${courseId}`}
								key={item._id}
							>
								<h2>{item.courseTitle}</h2>
								<p>
									Completed{" "}
									{completedChapters &&
										numberOfChapters &&
										Math.round((completedChapters * 100) / numberOfChapters)}
									%
								</p>
							</Link>
						);
					}
					return "";
				})}
		</>
	);
};

export default EnrolledCourseItem;
