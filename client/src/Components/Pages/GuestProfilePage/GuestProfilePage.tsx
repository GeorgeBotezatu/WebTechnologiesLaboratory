import "./GuestProfilePage.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { loadProfileById } from "../../../API/profileAPI";
import {
	guestProfileLoadFail,
	guestProfileLoadInit,
	guestProfileLoadSuccess,
} from "../../../Store/features/userProfileSlice";
import { CAN_NOT_LOAD_GUEST_PROFILE } from "../../../Utils/constants";
import { RootState } from "../../../Store/Store";
import ProfileSideMenu from "../../Moleculs/Profile/ProfileSideMenu/ProfileSideMenu";
import ProfileCard from "../../Moleculs/Profile/ProfileCard/ProfileCard";
import BadgesSection from "../../Moleculs/Profile/BadgesSection/BadgesSection";
import ProfileAboutCard from "../../Moleculs/Profile/ProfileAboutCard/ProfileAboutCard";
import ProfileExperienceCard from "../../Moleculs/Profile/ProfileExperienceCard/ProfileExperienceCard";
import ProfileEducationCard from "../../Moleculs/Profile/ProfileEducationCard/ProfileEducationCard";
import EnrolledCourseSection from "../../Moleculs/Profile/EnrolledCourseSection/EnrolledCourseSection";
import CodeCard from "../../Moleculs/Profile/CodeCard/CodeCard";
import SocialCard from "../../Moleculs/Profile/SocialCard/SocialCard";

const GuestProfilePage = () => {
	const dispatch = useDispatch();
	const { userId } = useParams();
	useEffect(() => {
		const loadPlatformData = async () => {
			try {
				dispatch(guestProfileLoadInit());
				let res;
				if (userId) {
					res = await loadProfileById(userId);
				}
				if (!res) {
					dispatch(guestProfileLoadFail(CAN_NOT_LOAD_GUEST_PROFILE));
				} else {
					dispatch(guestProfileLoadSuccess(res));
				}
			} catch (error: any) {
				console.log(error);
				dispatch(guestProfileLoadFail(error.message));
			}
		};
		loadPlatformData();
	}, [dispatch]);
	const { guestProfile } = useSelector(
		(state: RootState) => state.guestProfile
	);

	const github = guestProfile.githubusername;
	const userCard = guestProfile.user;
	const profileDate = guestProfile.date;

	const componentClass = "wtl-guest-profile-page";
	const contentClass = `${componentClass}--content`;

	return (
		<div className={componentClass}>
			<div className={contentClass}>
				<ProfileCard
					github={github ? github : null}
					userCard={userCard}
					profileDate={profileDate}
				/>
				<BadgesSection />
				<ProfileAboutCard about={guestProfile?.about} />
				<ProfileExperienceCard />
				<ProfileEducationCard />
				<EnrolledCourseSection />
				<SocialCard socialLinks={guestProfile?.social} />
			</div>
		</div>
	);
};

export default GuestProfilePage;
