import "./ProfileSideMenu.scss";
import React from "react";
import AnimatedLinks from "../../../Atoms/AnimatedLinks/AnimatedLinks";
import {
	ADD_EDUCATION,
	ADD_EXPERIENCE,
	EDIT_SOCIAL,
	MODIFY_ABOUT_PATH,
} from "../../../../Routes/routesPath";

interface ISideMenu {
	about: boolean;
	experience: boolean;
	education: boolean;
	social: boolean;
}

const ProfileSideMenu: React.FC<ISideMenu> = ({
	about,
	experience,
	education,
	social,
}) => {
	const componentClass = "wtl-side-menu-container";
	const titleClass = `${componentClass}--title`;
	const linksContainerClass = `${componentClass}__links-container`;
	console.log(about, experience, education, social);
	return (
		<div className={componentClass}>
			<h1 className={titleClass}>Sections :</h1>
			<div className={linksContainerClass}>
				{about ? (
					<AnimatedLinks link="#about" text="About" />
				) : (
					<AnimatedLinks link={MODIFY_ABOUT_PATH} text="Add About" />
				)}
				{experience ? (
					<AnimatedLinks link="#experience" text="Experience" />
				) : (
					<AnimatedLinks link={ADD_EXPERIENCE} text="Add Experience" />
				)}

				{education ? (
					<AnimatedLinks link="#education" text="Education" />
				) : (
					<AnimatedLinks link={ADD_EDUCATION} text="Add Education" />
				)}
				{social ? (
					<AnimatedLinks link="#social" text="Social" />
				) : (
					<AnimatedLinks link={EDIT_SOCIAL} text="Add Social" />
				)}
				<AnimatedLinks link="#top" text="Go on top" />
			</div>
		</div>
	);
};

export default ProfileSideMenu;
