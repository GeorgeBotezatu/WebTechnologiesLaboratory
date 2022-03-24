import "./EditSocialPage.scss";
import React from "react";
import SocialForm from "../../Moleculs/Profile/SocialForm/SocialForm";

const EditSocialPage: React.FC = () => {
	const componentClass = "wtl-edit-social-page";
	const imageClass = `${componentClass}--image`;
	const titleClass = `${componentClass}--title`;
	return (
		<div>
			<div className={imageClass}></div>
			<div className={titleClass}>
				<p>Let's communicate and share experiences</p>
			</div>
			<SocialForm />
		</div>
	);
};

export default EditSocialPage;
