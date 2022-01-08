import "./ProfilePage.scss";
import React from "react";
import ProfileCard from "../../Moleculs/ProfileCard/ProfileCard";
import { RootState } from "../../../Store/Store";
import { useSelector } from "react-redux";
import ProfileAboutCard from "../../Moleculs/ProfileAboutCard/ProfileAboutCard";

const ProfilePage = () => {
	const { userProfile } = useSelector((state: RootState) => state.userProfile);
	const github = userProfile.githubusername;
	const userCard = userProfile.user;
	const profileDate = userProfile.date;
	console.log(userProfile.about);
	const componentClass = "wtl-profile-page";
	return (
		<div className={componentClass}>
			<ProfileCard
				github={github ? github : null}
				userCard={userCard}
				profileDate={profileDate}
			/>

			<ProfileAboutCard about={userProfile?.about} />
		</div>
	);
};

export default ProfilePage;
