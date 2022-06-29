import "./ProfileExperienceCard.scss";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ADD_EXPERIENCE } from "../../../../Routes/routesPath";
import { RootState } from "../../../../Store/Store";
import { ADD_EXPERIENCE_MSG } from "../../../../Utils/constants";
import AnimatedButton from "../../../Atoms/AnimatedButton/AnimatedButton";
import {
	ORANGE,
	PROFILE_ADD_EXP_DIM,
	PROFILE_ADD_EXP_POS,
} from "../../../Atoms/AnimatedButton/ButtonModifiers";
import ExperienceItem from "../ExperienceItem/ExperienceItem";
import { useLocation } from "react-router";

const ProfileExperienceCard: React.FC = () => {
	const { experience } = useSelector(
		(state: RootState) => state.userProfile.userProfile
	);
	const { pathname } = useLocation();
	useEffect(() => {}, [experience]);
	const classComponent = "wtl-experience-section";
	const titleContainerClass = `${classComponent}__title-container`;
	const titileClass = `${titleContainerClass}--title`;
	const expContainerClass = `${classComponent}__container`;
	return (
		<div id="experience" className={classComponent}>
			{experience && experience[0] && (
				<>
					<div className={titileClass}>
						<h2 className={titileClass}>Experience</h2>
						{!pathname.includes("/guest") && (
							<AnimatedButton
								buttonColor={ORANGE}
								buttonDimension={PROFILE_ADD_EXP_DIM}
								buttonPosition={PROFILE_ADD_EXP_POS}
								buttonMessage={ADD_EXPERIENCE_MSG}
								buttonRoute={ADD_EXPERIENCE}
							/>
						)}
					</div>
					<div className={expContainerClass}>
						{experience &&
							experience.map((item, index) => {
								return (
									<ExperienceItem
										title={item.title}
										company={item.company}
										current={item.current}
										description={item.description}
										from={item.from}
										location={item.location}
										to={item.to}
										_id={item._id}
										index={index}
										numberOfItems={experience.length}
										key={index}
									/>
								);
							})}
					</div>
				</>
			)}
		</div>
	);
};

export default ProfileExperienceCard;
