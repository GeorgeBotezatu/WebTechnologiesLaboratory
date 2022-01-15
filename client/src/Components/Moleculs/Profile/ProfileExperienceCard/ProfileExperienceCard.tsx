import "./ProfileExperienceCard.scss";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ADD_EXPERIENCE } from "../../../../Routes/routesPath";
import { RootState } from "../../../../Store/Store";
import { ADD_EXPERIENCE_MSG, PROFILE } from "../../../../Utils/constants";
import AnimatedButton from "../../../Atoms/AnimatedButton/AnimatedButton";
import {
	ORANGE,
	PROFILE_EXP,
	STANDARD,
} from "../../../Atoms/AnimatedButton/ButtonModifiers";
import ExperienceItem from "../ExperienceItem/ExperienceItem";

const ProfileExperienceCard: React.FC = () => {
	const { experience } = useSelector(
		(state: RootState) => state.userProfile.userProfile
	);
	useEffect(() => {}, [experience]);
	const classComponent = "wtl-experience-section";
	const titileClass = `${classComponent}--title`;
	const expContainerClass = `${classComponent}__container`;

	return (
		<div className={classComponent}>
			{experience && experience[0] ? (
				<>
					<h2 className={titileClass}>Experience</h2>
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
									/>
								);
							})}
					</div>
				</>
			) : (
				<AnimatedButton
					buttonColor={ORANGE}
					buttonDimension={STANDARD}
					buttonPosition={PROFILE_EXP}
					buttonMessage={ADD_EXPERIENCE_MSG}
					buttonRoute={ADD_EXPERIENCE}
				/>
			)}
		</div>
	);
};

export default ProfileExperienceCard;
