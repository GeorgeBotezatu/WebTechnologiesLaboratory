import { createSlice } from "@reduxjs/toolkit";
import { IUserState } from "../../Interfaces";

interface initialStateInterface {
	loading: boolean;
	error: string | null;
	userProfile: IUserState;
}

const initialState: initialStateInterface = {
	loading: false,
	error: null,
	userProfile: {
		user: { _id: "", name: "", email: "", avatar: "", isAdmin: false },
		date: null,
		enroledCourses: [],
	},
};

export const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		profileLoadInit: (state) => {
			state.loading = true;
		},
		profileLoadSuccess: (state, action) => {
			state.loading = false;
			state.userProfile = action.payload;
		},
		profileLoadFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		profileClear: (state) => {
			state.loading = false;
			state.error = null;
			state.userProfile = {
				user: { _id: "", name: "", email: "", avatar: "", isAdmin: false },
				date: null,
			};
		},
		profileGithubInit: (state) => {
			state.loading = true;
		},
		profileGithubSuccess: (state, action) => {
			state.loading = false;
			state.userProfile.githubusername = action.payload;
		},
		profileGithubFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		profileEditAboutInit: (state) => {
			state.loading = true;
		},
		profileEditAboutSuccess: (state, action) => {
			state.loading = false;
			if (state.userProfile.about) {
				state.userProfile.about.website = action.payload.website;
				state.userProfile.about.skills = action.payload.skills;
				state.userProfile.about.status = action.payload.status;
				state.userProfile.about.bio = action.payload.bio;
			}
		},
		profileEditAboutFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		profileDeleteExpInit: (state) => {
			state.loading = true;
		},
		profileDeleteExpSuccess: (state, action) => {
			state.loading = false;
			state.userProfile = action.payload;
		},
		profileDeleteExpFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		profileDeleteEduInit: (state) => {
			state.loading = true;
		},
		profileDeleteEduSuccess: (state, action) => {
			state.loading = false;
			state.userProfile = action.payload;
		},
		profileDeleteEduFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		profileUpdateExpInit: (state) => {
			state.loading = true;
		},
		profileUpdateExpSuccess: (state, action) => {
			state.loading = false;
			state.userProfile = action.payload;
		},
		profileUpdateExpFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		profileUpdateEduInit: (state) => {
			state.loading = true;
		},
		profileUpdateEduSuccess: (state, action) => {
			state.loading = false;
			state.userProfile = action.payload;
		},
		profileUpdateEduFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		profileSocialInit: (state) => {
			state.loading = true;
		},
		profileSocialSuccess: (state, action) => {
			state.loading = false;
			state.userProfile = action.payload;
		},
		profileSocialFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		profileDeleteCodeSavesInit: (state) => {
			state.loading = true;
		},
		profileDeleteCodeSavesSuccess: (state, action) => {
			state.loading = false;
			state.userProfile = action.payload;
		},
		profileDeleteCodeSavesFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		profileUpdateCodeSavesInit: (state) => {
			state.loading = true;
		},
		profileUpdateCodeSavesSuccess: (state, action) => {
			state.loading = false;
			state.userProfile = action.payload;
		},
		profileUpdateCodeSavesFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		profileCourseEnroleInit: (state) => {
			state.loading = true;
		},
		profileCourseEnroleSuccess: (state, action) => {
			state.loading = false;
			state.userProfile = action.payload;
		},
		profileCourseEnroleFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		profileChapterCompletionInit: (state) => {
			state.loading = true;
		},
		profileChapterCompletionSuccess: (state, action) => {
			state.loading = false;
			state.userProfile = action.payload;
		},
		profileChapterCompletionFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		profileSaveQuizScoreInit: (state) => {
			state.loading = true;
		},
		profileSaveQuizScoreSuccess: (state, action) => {
			state.loading = false;
			state.userProfile = action.payload;
		},
		profileSaveQuizScoreFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		finishCourseInit: (state) => {
			state.loading = true;
		},
		finishCourseSuccess: (state, action) => {
			state.loading = false;
			state.userProfile = action.payload;
		},
		finishCourseFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const {
	profileLoadInit,
	profileLoadSuccess,
	profileLoadFail,
	profileClear,
	profileGithubFail,
	profileGithubInit,
	profileGithubSuccess,
	profileEditAboutInit,
	profileEditAboutSuccess,
	profileEditAboutFail,
	profileUpdateExpInit,
	profileUpdateExpSuccess,
	profileUpdateExpFail,
	profileDeleteExpInit,
	profileDeleteExpSuccess,
	profileDeleteExpFail,
	profileUpdateEduInit,
	profileUpdateEduSuccess,
	profileUpdateEduFail,
	profileDeleteEduInit,
	profileDeleteEduSuccess,
	profileDeleteEduFail,
	profileSocialInit,
	profileSocialSuccess,
	profileSocialFail,
	profileDeleteCodeSavesFail,
	profileDeleteCodeSavesInit,
	profileDeleteCodeSavesSuccess,
	profileUpdateCodeSavesInit,
	profileUpdateCodeSavesSuccess,
	profileUpdateCodeSavesFail,
	profileCourseEnroleFail,
	profileCourseEnroleInit,
	profileCourseEnroleSuccess,
	profileChapterCompletionInit,
	profileChapterCompletionSuccess,
	profileChapterCompletionFail,
	profileSaveQuizScoreInit,
	profileSaveQuizScoreSuccess,
	profileSaveQuizScoreFail,
	finishCourseFail,
	finishCourseInit,
	finishCourseSuccess,
} = profileSlice.actions;
export default profileSlice.reducer;
