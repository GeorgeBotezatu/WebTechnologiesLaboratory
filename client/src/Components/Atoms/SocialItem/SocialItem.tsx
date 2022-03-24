import "./SocialItem.scss";
import React from "react";
import classNames from "classnames";

interface ISocialItem {
	link: string;
	iconType: string;
}
const SocialItem: React.FC<ISocialItem> = ({ link, iconType }) => {
	const componentClass = "wtl-social-item";
	const iconClass = `${componentClass}__icon`;

	return (
		<>
			{iconType === "facebook" && ( //need to include http or https to woek
				<a href={link} target="_blank" rel="noreferrer">
					<i className={classNames("fab fa-facebook-f ", iconClass)}></i>
				</a>
			)}
			{iconType === "youtube" && ( //need to include http or https to woek
				<a href={link} target="_blank" rel="noreferrer">
					<i className={classNames("fab fa-youtube ", iconClass)}></i>
				</a>
			)}
			{iconType === "twitter" && ( //need to include http or https to woek
				<a href={link} target="_blank" rel="noreferrer">
					<i className={classNames("fab fa-twitter ", iconClass)}></i>
				</a>
			)}
			{iconType === "instagram" && ( //need to include http or https to woek
				<a href={link} target="_blank" rel="noreferrer">
					<i className={classNames("fab fa-instagram ", iconClass)}></i>
				</a>
			)}
			{iconType === "linkedin" && ( //need to include http or https to woek
				<a href={link} target="_blank" rel="noreferrer">
					<i className={classNames("fab fa-linkedin ", iconClass)}></i>
				</a>
			)}
		</>
	);
};

export default SocialItem;
