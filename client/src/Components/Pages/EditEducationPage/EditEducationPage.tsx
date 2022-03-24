import "./EditEducationPage.scss";
import React from "react";
import EducationForm from "../../Moleculs/Profile/EducationForm/EducationForm";

const EditEducationPage = () => {
	const componentClass = "wtl-edit-education-page";
	const imageClass = `${componentClass}--image`;
	const titleClass = `${componentClass}--title`;
	return (
		<div>
			<div className={imageClass}></div>
			<div className={titleClass}>
				<p>Add an Education</p>
			</div>
			<EducationForm />
		</div>
	);
};

export default EditEducationPage;
