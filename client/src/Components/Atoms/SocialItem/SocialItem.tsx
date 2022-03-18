import "./SocialItem.scss";
import React from "react";
import classNames from "classnames";
import { FaFacebookF } from "react-icons/fa";

interface ISocialItem {
	link: string;
	iconType: string;
}
const SocialItem: React.FC<ISocialItem> = ({ link, iconType }) => {
	const componentClass = "wtl-social-item";
	const iconClass = `${componentClass}__icon`;

	const clickHandler = () => {
		window.location.href = "https://www.google.com/?hl=ro";
	};

	return (
		<>
			{iconType === "facebook" && ( //need to include http or https to woek
				<a href={link} target="_blank">
					<i className={classNames("fab fa-facebook-f ", iconClass)}></i>
				</a>
			)}
			{iconType === "youtube" && ( //need to include http or https to woek
				<a href={link} target="_blank">
					<i className={classNames("fab fa-youtube ", iconClass)}></i>
				</a>
			)}
			{iconType === "twitter" && ( //need to include http or https to woek
				<a href={link} target="_blank">
					<i className={classNames("fab fa-twitter ", iconClass)}></i>
				</a>
			)}
			{iconType === "instagram" && ( //need to include http or https to woek
				<a href={link} target="_blank">
					<i className={classNames("fab fa-instagram ", iconClass)}></i>
				</a>
			)}
			{iconType === "linkedin" && ( //need to include http or https to woek
				<a href={link} target="_blank">
					<i className={classNames("fab fa-linkedin ", iconClass)}></i>
				</a>
			)}
		</>
	);
};

export default SocialItem;
