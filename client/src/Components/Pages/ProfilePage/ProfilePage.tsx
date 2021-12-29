import "./ProfilePage.scss";
import React from "react";
import ProfileCard from "../../Moleculs/ProfileCard/ProfileCard";
import { RootState } from "../../../Store/Store";
import { useSelector } from "react-redux";
const ProfilePage = () => {
	const { userProfile } = useSelector((state: RootState) => state.userProfile);
	console.log(userProfile);
	const componentClass = "wtl-profile-page";
	return (
		<div className={componentClass}>
			<ProfileCard />
		</div>
	);
};

export default ProfilePage;
