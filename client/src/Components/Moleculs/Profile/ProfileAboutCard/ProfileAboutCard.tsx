import "./ProfileAboutCard.scss";
import React from "react";
import checkImage from "../../../../Assets/Icons/check-icon.svg";
import AnimatedButton from "../../../Atoms/AnimatedButton/AnimatedButton";
import {
	ORANGE,
	PROFILE,
	PROFILE_WITH_ABOUT,
	STANDARD,
	STANDARD_WITH_ABOUT,
} from "../../../Atoms/AnimatedButton/ButtonModifiers";
import { ADD_ABOUT_SECTION, MODIFY_ABOUT } from "../../../../Utils/constants";
import { MODIFY_ABOUT_PATH } from "../../../../Routes/routesPath";
interface IProfileAboutCard {
	about:
		| {
				website?: string | undefined;
				status?: string | undefined;
				skills?: string[] | undefined;
				bio?: string | undefined;
		  }
		| undefined;
}
const ProfileAboutCard: React.FC<IProfileAboutCard> = ({ about }) => {
	const componentClass = "wtl-about-section";
	const titleContainerClass = `${componentClass}__title-container`;
	const aboutContainerClass = `${componentClass}__about-container`;
	const websiteClass = `${aboutContainerClass}--website`;
	const statusClass = `${aboutContainerClass}--status`;
	const skillsContainerClass = `${aboutContainerClass}__skills-container`;
	const skillContainerClass = `${skillsContainerClass}__skill-container`;
	const skillClass = `${skillContainerClass}--skill`;
	const bioContainerClass = `${aboutContainerClass}__bio-container`;
	return (
		<div id="about" className={componentClass}>
			{!about?.website && !about?.status && !about?.bio ? (
				<AnimatedButton
					buttonColor={ORANGE}
					buttonDimension={STANDARD}
					buttonPosition={PROFILE}
					buttonMessage={ADD_ABOUT_SECTION}
					buttonRoute={MODIFY_ABOUT_PATH}
				/>
			) : (
				<>
					<div className={titleContainerClass}>
						<p className={`${titleContainerClass}--p`}>About</p>
						<AnimatedButton
							buttonColor={ORANGE}
							buttonDimension={STANDARD_WITH_ABOUT}
							buttonPosition={PROFILE_WITH_ABOUT}
							buttonMessage={MODIFY_ABOUT}
							buttonRoute={MODIFY_ABOUT_PATH}
						/>
					</div>
					<div className={aboutContainerClass}>
						<p className={websiteClass}>
							{about?.website ? (
								<>
									<span>My website: </span>
									<a href={about.website}>{about.website}</a>
								</>
							) : (
								""
							)}
						</p>
						<p className={statusClass}>
							<span>My status: </span>
							{about?.status ? about.status : "Not added yet!"}
						</p>
						<div className={skillsContainerClass}>
							<p className={`${skillsContainerClass}--p`}>My skills: </p>
							<div className={skillContainerClass}>
								{about?.skills ? (
									about.skills.map((skill, index) => (
										<div className={skillClass} key={index}>
											<img
												className={`${skillClass}--image`}
												src={checkImage}
												alt=""
											/>
											<p className={`${skillClass}--p`}>{skill}</p>
										</div>
									))
								) : (
									<p>Not added yet!</p>
								)}
							</div>
						</div>
						{about?.bio ? (
							<div className={bioContainerClass}>
								<p className={`${bioContainerClass}--title`}>
									<span>Bio: </span>
								</p>
								<p className={`${bioContainerClass}--bio`}>{about.bio}</p>
							</div>
						) : (
							""
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default ProfileAboutCard;
