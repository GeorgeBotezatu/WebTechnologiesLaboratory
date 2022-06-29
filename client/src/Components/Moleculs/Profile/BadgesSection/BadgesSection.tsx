import "./BadgesSection.scss";
import React from "react";
import addAboutBadge from "../../../../Assets/Badges/add_about.png";
import firstEnrollement from "../../../../Assets/Badges/first_enrollement.png";
import socialBadge from "../../../../Assets/Badges/one_social_link.png";
import firstCourseFinished from "../../../../Assets/Badges/finish_first_course.png";
import firstEducationItem from "../../../../Assets/Badges/one_education_item.png";
import firstExperienceItem from "../../../../Assets/Badges/one_expereince_item.png";
import oneConsoleItem from "../../../../Assets/Badges/addOneConsole.png";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Store/Store";

const BadgesSection: React.FC = () => {
	const { userProfile } = useSelector((state: RootState) => state.userProfile);

	const componentClass = "wtl-badges-section";
	const titleContainerClass = `${componentClass}__title-container`;
	const titleClass = `${titleContainerClass}--title`;
	const progressClass = `${titleContainerClass}--progress`;
	const badgeContainerClass = `${componentClass}__badge-container`;

	const numberOfFinishedCourses = () => {
		let courses: number = 0;
		if (userProfile && userProfile.enroledCourses) {
			for (let i = 0; i <= userProfile?.enroledCourses?.length; i++) {
				if (userProfile?.enroledCourses[i]?.finished === true) {
					courses++;
				}
			}
		}
		return courses;
	};

	return (
		<div id="code-card" className={componentClass}>
			<div className={titleContainerClass}>
				<h2 className={titleClass}>Your badges</h2>
				<h2 className={progressClass}> Total badges to colect 7</h2>
			</div>
			<div className={badgeContainerClass}>
				{userProfile &&
				!userProfile.about?.website &&
				!userProfile.about?.status &&
				!userProfile.about?.bio ? (
					<></>
				) : (
					<>
						<div>
							<img src={addAboutBadge} alt="add-about-badge" />
						</div>
					</>
				)}
				{userProfile &&
					userProfile.enroledCourses &&
					userProfile.enroledCourses.length > 0 && (
						<div>
							<img src={firstEnrollement} alt="first-enrollment" />
						</div>
					)}
				{userProfile && userProfile.social && (
					<div>
						<img src={socialBadge} alt="social-links-added" />
					</div>
				)}
				{numberOfFinishedCourses() >= 1 && (
					<div>
						<img src={firstCourseFinished} alt="social-links-added" />
					</div>
				)}
				{userProfile &&
					userProfile.education &&
					userProfile.education.length > 0 && (
						<div>
							<img src={firstEducationItem} alt="social-links-added" />
						</div>
					)}
				{userProfile &&
					userProfile.experience &&
					userProfile.experience.length > 0 && (
						<div>
							<img src={firstExperienceItem} alt="social-links-added" />
						</div>
					)}
				{userProfile &&
					userProfile.codeSaves &&
					userProfile.codeSaves.length > 0 && (
						<div>
							<img src={oneConsoleItem} alt="social-links-added" />
						</div>
					)}
			</div>
		</div>
	);
};

export default BadgesSection;
