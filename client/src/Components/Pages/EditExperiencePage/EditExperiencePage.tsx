import "./EditExperiencePage.scss";
import React from "react";
import ExperienceForm from "../../Moleculs/Profile/ExperienceForm/ExperienceForm";

const EditExperiencePage = () => {
	const componentClass = "wtl-edit-experience-page";
	const imageClass = `${componentClass}--image`;
	const titleClass = `${componentClass}--title`;
	return (
		<div>
			<div className={imageClass}></div>
			<div className={titleClass}>
				<p>Add an Experience</p>
			</div>
			<ExperienceForm />
		</div>
	);
};

export default EditExperiencePage;
