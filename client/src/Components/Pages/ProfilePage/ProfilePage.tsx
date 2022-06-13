import "./ProfilePage.scss";
import React from "react";
import ProfileCard from "../../Moleculs/Profile/ProfileCard/ProfileCard";
import { RootState } from "../../../Store/Store";
import { useSelector } from "react-redux";
import ProfileAboutCard from "../../Moleculs/Profile/ProfileAboutCard/ProfileAboutCard";
import ProfileExperienceCard from "../../Moleculs/Profile/ProfileExperienceCard/ProfileExperienceCard";
import ProfileSideMenu from "../../Moleculs/Profile/ProfileSideMenu/ProfileSideMenu";
import ProfileEducationCard from "../../Moleculs/Profile/ProfileEducationCard/ProfileEducationCard";
import SocialCard from "../../Moleculs/Profile/SocialCard/SocialCard";
import CodeCard from "../../Moleculs/Profile/CodeCard/CodeCard";
import EnrolledCourseSection from "../../Moleculs/Profile/EnrolledCourseSection/EnrolledCourseSection";
import BadgesSection from "../../Moleculs/Profile/BadgesSection/BadgesSection";

const ProfilePage: React.FC = () => {
	const { userProfile } = useSelector((state: RootState) => state.userProfile);
	const github = userProfile.githubusername;
	const userCard = userProfile.user;
	const profileDate = userProfile.date;

	const componentClass = "wtl-profile-page";
	const contentClass = `${componentClass}--content`;
	const sideMenuClass = `${componentClass}--side-menu`;
	return (
		<div className={componentClass}>
			<div className={sideMenuClass}>
				<ProfileSideMenu
					about={userProfile.about?.status ? true : false}
					experience={
						userProfile?.experience && userProfile.experience[0] ? true : false
					}
					education={
						userProfile?.education && userProfile.education[0] ? true : false
					}
					social={
						userProfile.social?.facebook ||
						userProfile.social?.instagram ||
						userProfile.social?.linkedin ||
						userProfile.social?.twitter ||
						userProfile.social?.youtube
							? true
							: false
					}
					codeSaves={
						userProfile.codeSaves && userProfile.codeSaves[0] ? true : false
					}
					courses={
						userProfile?.enroledCourses && userProfile.enroledCourses[0]
							? true
							: false
					}
				/>
			</div>
			<div className={contentClass}>
				<ProfileCard
					github={github ? github : null}
					userCard={userCard}
					profileDate={profileDate}
				/>
				<BadgesSection />
				<ProfileAboutCard about={userProfile?.about} />
				<ProfileExperienceCard />
				<ProfileEducationCard />
				<EnrolledCourseSection />
				<CodeCard />
				<SocialCard socialLinks={userProfile?.social} />
			</div>
		</div>
	);
};

export default ProfilePage;
