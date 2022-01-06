import "./ProfilePage.scss";
import React from "react";
import ProfileCard from "../../Moleculs/ProfileCard/ProfileCard";
import { RootState } from "../../../Store/Store";
import { useSelector } from "react-redux";

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
		</div>
	);
};

export default ProfilePage;
