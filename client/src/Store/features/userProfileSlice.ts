import { createSlice } from "@reduxjs/toolkit";
import { IUserState } from "../../Interfaces";

interface initialStateInterface {
	loading: boolean;
	error: string | null;
	guestProfile: IUserState;
}

const initialState: initialStateInterface = {
	loading: false,
	error: null,
	guestProfile: {
		user: { _id: "", name: "", email: "", avatar: "", isAdmin: false },
		date: null,
		enroledCourses: [],
	},
};

export const guesrProfileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		guestProfileLoadInit: (state) => {
			state.loading = true;
		},
		guestProfileLoadSuccess: (state, action) => {
			state.loading = false;
			state.guestProfile = action.payload;
		},
		guestProfileLoadFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		guestProfileClear: (state) => {
			state.loading = false;
			state.error = null;
			state.guestProfile = {
				user: { _id: "", name: "", email: "", avatar: "", isAdmin: false },
				date: null,
			};
		},
	},
});

export const {
	guestProfileClear,
	guestProfileLoadFail,
	guestProfileLoadInit,
	guestProfileLoadSuccess,
} = guesrProfileSlice.actions;
export default guesrProfileSlice.reducer;
