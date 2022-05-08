import "./CourseLanding.scss";
import React from "react";
import { Link } from "react-router-dom";

interface ICourseLanding {
	courseTitle?: string;
	courseDescription?: string;
	firstChapterId?: string;
}

const CourseLanding: React.FC<ICourseLanding> = ({
	courseTitle,
	courseDescription,
	firstChapterId,
}) => {
	const componentClass = "wtl-course-landing";
	const titleClass = `${componentClass}--title`;
	const descriptionClass = `${componentClass}--description`;
	const adviceClass = `${componentClass}__advice`;
	const beginCourseClass = `${componentClass}--begin`;
	return (
		<div className={componentClass}>
			<h1 className={titleClass}>{courseTitle}</h1>
			<p className={descriptionClass}>{courseDescription}</p>
			<div className={adviceClass}>
				<p>
					<span>*</span> To get the most out of this course try every code
					snippet in the console and try to not cheat at quizes, beacuse you
					just cheat yourself.
				</p>
				<p>
					<span>*</span> Do not hesitatein at any moment to go and test your
					accumulated knoledge to the console <Link to="/console">HERE </Link>(
					is not needed to save this link, it will be available on each chpater
					).
				</p>
				<p>
					<span>*</span> If there are mistakes notify me with report problem
					section "Here".
				</p>
			</div>
			<Link className={beginCourseClass} to={`chapter/${firstChapterId}`}>
				Begin Course
			</Link>
		</div>
	);
};

export default CourseLanding;
