import "./ProfilePage.scss";
import React from "react";
import ProfileCard from "../../Moleculs/Profile/ProfileCard/ProfileCard";
import { RootState } from "../../../Store/Store";
import { useSelector } from "react-redux";
import ProfileAboutCard from "../../Moleculs/Profile/ProfileAboutCard/ProfileAboutCard";
import ProfileExperienceCard from "../../Moleculs/Profile/ProfileExperienceCard/ProfileExperienceCard";

const ProfilePage = () => {
	const { userProfile } = useSelector((state: RootState) => state.userProfile);
	const github = userProfile.githubusername;
	const userCard = userProfile.user;
	const profileDate = userProfile.date;
	const componentClass = "wtl-profile-page";

	return (
		<div className={componentClass}>
			<ProfileCard
				github={github ? github : null}
				userCard={userCard}
				profileDate={profileDate}
			/>

			<ProfileAboutCard about={userProfile?.about} />
			<ProfileExperienceCard />
		</div>
	);
};

export default ProfilePage;
