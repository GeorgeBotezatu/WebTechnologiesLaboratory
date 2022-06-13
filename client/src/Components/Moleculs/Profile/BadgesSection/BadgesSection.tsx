import "./BadgesSection.scss";
import React, { useEffect, useState } from "react";
import addAboutBadge from "../../../../Assets/Badges/add_about.png";
import firstEnrollement from "../../../../Assets/Badges/first_enrollement.png";
import socialBadge from "../../../../Assets/Badges/one_social_link.png";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Store/Store";

const BadgesSection: React.FC = () => {
	const [badges, setBadges] = useState(0);
	const { userProfile } = useSelector((state: RootState) => state.userProfile);
	useEffect(() => {
		if (
			userProfile &&
			userProfile.about?.website &&
			userProfile.about?.status &&
			userProfile.about?.bio
		) {
			setBadges(badges + 1);
		}
		if (
			userProfile &&
			userProfile.enroledCourses &&
			userProfile.enroledCourses.length > 1
		) {
			setBadges(badges + 1);
		}
	}, [userProfile]);

	const componentClass = "wtl-badges-section";
	const titleContainerClass = `${componentClass}__title-container`;
	const titleClass = `${titleContainerClass}--title`;
	const progressClass = `${titleContainerClass}--progress`;
	const badgeContainerClass = `${componentClass}__badge-container`;
	return (
		<div id="code-card" className={componentClass}>
			<div className={titleContainerClass}>
				<h2 className={titleClass}>Your badges</h2>
				<h2 className={progressClass}>{badges} out of 13</h2>
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
					userProfile.enroledCourses.length > 1 && (
						<div>
							<img src={firstEnrollement} alt="first-enrollment" />
						</div>
					)}
				{userProfile && userProfile.social && (
					<div>
						<img src={socialBadge} alt="social-links-added" />
					</div>
				)}
			</div>
		</div>
	);
};

export default BadgesSection;
