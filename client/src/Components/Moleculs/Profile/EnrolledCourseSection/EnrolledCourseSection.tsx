import "./EnrolledCourseSection.scss";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Store/Store";
import EnrolledCourseItem from "../EnrolledCourseItem/EnrolledCourseItem";

const EnrolledCourseSection: React.FC = () => {
	const { userProfile } = useSelector((state: RootState) => state.userProfile);

	useEffect(() => {}, [userProfile]);

	const componentClass = "wtl-enrolled-courses-section";
	const titleContainerClass = `${componentClass}__title-container`;
	const titileClass = `${titleContainerClass}--title`;
	const itemsContainerClass = `${componentClass}__container`;
	return (
		<div id="courses" className={componentClass}>
			{userProfile &&
				userProfile.enroledCourses &&
				userProfile.enroledCourses[0] && (
					<>
						<div className={titileClass}>
							<h2 className={titileClass}>Enrolled Courses</h2>
						</div>
						<div className={itemsContainerClass}>
							{userProfile.enroledCourses &&
								userProfile.enroledCourses.map((item) => {
									return (
										<EnrolledCourseItem
											courseId={item?.courseId}
											completedChapters={item.completedChapters?.length}
											numberOfChapters={item.numOfChapters}
											key={item.courseId}
										/>
									);
								})}
						</div>
					</>
				)}
		</div>
	);
};

export default EnrolledCourseSection;
