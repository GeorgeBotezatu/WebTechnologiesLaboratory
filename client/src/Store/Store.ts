import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./features/registerSlice";
import profileReducer from "./features/profileSlice";
import coursesReducer from "./features/coursesSlice";
export const store = configureStore({
	reducer: {
		auth: registerReducer,
		userProfile: profileReducer,
		coursesList: coursesReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
