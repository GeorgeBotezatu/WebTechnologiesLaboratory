import "./ProfileEducationCard.scss";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Store/Store";
import AnimatedButton from "../../../Atoms/AnimatedButton/AnimatedButton";
import {
	ORANGE,
	PROFILE_ADD_EXP_DIM,
	PROFILE_ADD_EXP_POS,
} from "../../../Atoms/AnimatedButton/ButtonModifiers";
import { ADD_EDUCATION_MSG } from "../../../../Utils/constants";
import { ADD_EDUCATION } from "../../../../Routes/routesPath";
import EducationItem from "../EducationItem/EducationItem";

const ProfileEducationCard: React.FC = () => {
	const { education } = useSelector(
		(state: RootState) => state.userProfile.userProfile
	);
	useEffect(() => {}, [education]);

	const classComponent = "wtl-education-section";
	const titleContainerClass = `${classComponent}__title-container`;
	const titileClass = `${titleContainerClass}--title`;
	const eduContainerClass = `${classComponent}__container`;
	return (
		<div id="education" className={classComponent}>
			{education && education[0] && (
				<>
					<div className={titileClass}>
						<h2 className={titileClass}>Education</h2>
						<AnimatedButton
							buttonColor={ORANGE}
							buttonDimension={PROFILE_ADD_EXP_DIM}
							buttonPosition={PROFILE_ADD_EXP_POS}
							buttonMessage={ADD_EDUCATION_MSG}
							buttonRoute={ADD_EDUCATION}
						/>
					</div>
					<div className={eduContainerClass}>
						{education &&
							education.map((item, index) => {
								return (
									<EducationItem
										school={item.school}
										degree={item.degree}
										current={item.current}
										description={item.description}
										from={item.from}
										fieldofstudy={item.fieldofstudy}
										to={item.to}
										_id={item._id}
										index={index}
										numberOfItems={education.length}
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

export default ProfileEducationCard;
