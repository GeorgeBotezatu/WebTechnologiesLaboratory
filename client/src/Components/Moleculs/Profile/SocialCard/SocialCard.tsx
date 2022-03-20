import "./SocialCard.scss";
import React from "react";
import AnimatedButton from "../../../Atoms/AnimatedButton/AnimatedButton";
import {
	ORANGE,
	PROFILE_ADD_EXP_DIM,
	PROFILE_SOCIAL_LINKS,
} from "../../../Atoms/AnimatedButton/ButtonModifiers";
import {
	EDIT_SOCIAL_LINKS,
	FACEBOOK,
	INSTAGRAM,
	LINKEDIN,
	TWITTER,
	YOUTUBE,
} from "../../../../Utils/constants";
import { EDIT_SOCIAL } from "../../../../Routes/routesPath";
import SocialItem from "../../../Atoms/SocialItem/SocialItem";

interface ISocialCard {
	socialLinks:
		| {
				youtube?: string;
				twitter?: string;
				facebook?: string;
				linkedin?: string;
				instagram?: string;
		  }
		| undefined;
}

const SocialCard: React.FC<ISocialCard> = ({ socialLinks }) => {
	const buttonState = {
		socialLinks,
		buttonPressed: true,
	};

	const classComponent = "wtl-social-section";
	const titleContainerClass = `${classComponent}__title-container`;
	const titleClass = `${titleContainerClass}--title`;
	const socialContainerClass = `${classComponent}__social-container`;
	return (
		<div id="social" className={classComponent}>
			{socialLinks && (
				<>
					<div className={titleClass}>
						<h2 className={titleClass}>Social</h2>
						<AnimatedButton
							buttonColor={ORANGE}
							buttonDimension={PROFILE_ADD_EXP_DIM}
							buttonPosition={PROFILE_SOCIAL_LINKS}
							buttonMessage={EDIT_SOCIAL_LINKS}
							buttonRoute={EDIT_SOCIAL}
							routeState={buttonState}
						/>
					</div>
					<div className={socialContainerClass}>
						{socialLinks?.youtube && (
							<SocialItem link={socialLinks.youtube} iconType={YOUTUBE} />
						)}
						{socialLinks?.twitter && (
							<SocialItem link={socialLinks.twitter} iconType={TWITTER} />
						)}
						{socialLinks?.facebook && (
							<SocialItem link={socialLinks.facebook} iconType={FACEBOOK} />
						)}
						{socialLinks?.linkedin && (
							<SocialItem link={socialLinks.linkedin} iconType={LINKEDIN} />
						)}
						{socialLinks?.instagram && (
							<SocialItem link={socialLinks.instagram} iconType={INSTAGRAM} />
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default SocialCard;
