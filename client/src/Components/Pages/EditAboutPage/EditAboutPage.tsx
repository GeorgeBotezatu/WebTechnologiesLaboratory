import "./EditAboutPage.scss";
import React from "react";
import EditAboutForm from "../../Moleculs/EditAboutForm/EditAboutForm";

const EditAboutPage = () => {
	const componentClass = "wtl-edit-about-page";
	const imageClass = `${componentClass}--image`;
	const titleClass = `${componentClass}--title`;
	return (
		<div className={componentClass}>
			<div className={imageClass}></div>
			<div className={titleClass}>
				<p>Personalize your about section</p>
			</div>
			<EditAboutForm />
		</div>
	);
};

export default EditAboutPage;
