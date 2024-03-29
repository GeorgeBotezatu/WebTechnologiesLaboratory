import "./ProfileAboutCard.scss";
import React from "react";
import checkImage from "../../../../Assets/Icons/check-icon.svg";
import AnimatedButton from "../../../Atoms/AnimatedButton/AnimatedButton";
import {
	ORANGE,
	PROFILE_WITH_ABOUT,
	STANDARD_WITH_ABOUT,
} from "../../../Atoms/AnimatedButton/ButtonModifiers";
import { MODIFY_ABOUT } from "../../../../Utils/constants";
import { MODIFY_ABOUT_PATH } from "../../../../Routes/routesPath";
import { useLocation } from "react-router";

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
	const { pathname } = useLocation();
	const componentClass = "wtl-about-section";
	const titleContainerClass = `${componentClass}__title-container`;
	const aboutContainerClass = `${componentClass}__about-container`;
	const websiteClass = `${aboutContainerClass}--website`;
	const statusClass = `${aboutContainerClass}--status`;
	const skillsContainerClass = `${aboutContainerClass}__skills-container`;
	const skillContainerClass = `${skillsContainerClass}__skill-container`;
	const skillClass = `${skillContainerClass}--skill`;
	const bioContainerClass = `${aboutContainerClass}__bio-container`;
	const routeState = { about: about, buttonPressed: true };
	return (
		<div id="about" className={componentClass}>
			{!about?.website && !about?.status && !about?.bio ? (
				<></>
			) : (
				<>
					<div className={titleContainerClass}>
						<p className={`${titleContainerClass}--p`}>About</p>
						{!pathname.includes("/guest") && (
							<AnimatedButton
								buttonColor={ORANGE}
								buttonDimension={STANDARD_WITH_ABOUT}
								buttonPosition={PROFILE_WITH_ABOUT}
								buttonMessage={MODIFY_ABOUT}
								buttonRoute={MODIFY_ABOUT_PATH}
								routeState={routeState}
							/>
						)}
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
