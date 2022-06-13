import "./CourseItem.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ICoursesListItem } from "../../../../Interfaces";
import { RootState } from "../../../../Store/Store";
import { Link, useNavigate } from "react-router-dom";
import {
	profileCourseEnroleFail,
	profileCourseEnroleInit,
	profileCourseEnroleSuccess,
} from "../../../../Store/features/profileSlice";
import { enrolCourse } from "../../../../API/profileAPI";
import { CAN_NOT_ENROLL } from "../../../../Utils/constants";

const CourseItem: React.FC<ICoursesListItem> = ({
	courseDescription,
	courseTitle,
	_id,
}) => {
	const { isAdmin } = useSelector((state: RootState) => state.auth);
	const { userProfile } = useSelector((state: RootState) => state.userProfile);
	const [enrolled, setEnrolled] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const componentClass = "wtl-course-item";
	const courseTitleClass = `${componentClass}--title`;
	const courseDescriptionClass = `${componentClass}--description`;
	const courseUserButtonClass = `${componentClass}--user-button`;
	const courseAdminButtonClass = `${componentClass}--admin-button`;
	const enrollCourseHandler = async () => {
		try {
			dispatch(profileCourseEnroleInit());
			let res;
			if (_id) {
				res = await enrolCourse(_id);
			}
			if (!res) {
				dispatch(profileCourseEnroleFail(CAN_NOT_ENROLL));
			} else {
				dispatch(profileCourseEnroleSuccess(res));
				navigate(`course/${_id}`);
			}
		} catch (error: any) {
			dispatch(profileCourseEnroleFail(error.message));
			console.log(error);
		}
	};
	useEffect(() => {
		userProfile?.enroledCourses?.map((item) => {
			if (item.courseId === _id) setEnrolled(true);
			return "";
		});
	}, []);
	return (
		<div className={componentClass}>
			<h2 className={courseTitleClass}>{courseTitle}</h2>
			<p className={courseDescriptionClass}>{courseDescription}</p>
			{enrolled ? (
				<Link to={`course/${_id}`} className={courseUserButtonClass}>
					Go to Course
				</Link>
			) : (
				<button
					onClick={() => {
						enrollCourseHandler();
					}}
					className={courseUserButtonClass}
				>
					Enroll
				</button>
			)}
			{isAdmin && (
				<Link to={`course/edit/${_id}`} className={courseAdminButtonClass}>
					Edit Course
				</Link>
			)}
		</div>
	);
};

export default CourseItem;
