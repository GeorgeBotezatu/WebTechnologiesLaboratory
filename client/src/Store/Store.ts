import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./features/registerSlice";
import profileReducer from "./features/profileSlice";
import coursesReducer from "./features/coursesSlice";
import courseReducer from "./features/courseSlice";
import postsReducer from "./features/postsSlice";
import postReducer from "./features/postSlice";
import problemReducer from "./features/problemSlice";
import dashboardReducer from "./features/dashboardStatsSlice";
import guestProfileReducer from "./features/userProfileSlice";
export const store = configureStore({
	reducer: {
		auth: registerReducer,
		userProfile: profileReducer,
		coursesList: coursesReducer,
		course: courseReducer,
		postsSlice: postsReducer,
		post: postReducer,
		dashboardProblems: problemReducer,
		dashboardStats: dashboardReducer,
		guestProfile: guestProfileReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
