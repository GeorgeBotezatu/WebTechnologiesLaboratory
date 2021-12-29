import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./features/registerSlice";
import profileReducer from "./features/profileSlice";

export const store = configureStore({
	reducer: { auth: registerReducer, userProfile: profileReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
