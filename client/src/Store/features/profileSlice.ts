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
		user: { _id: "", name: "", email: "", avatar: "" },
		date: null,
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
				user: { _id: "", name: "", email: "", avatar: "" },
				date: null,
			};
		},
	},
});

export const {
	profileLoadInit,
	profileLoadSuccess,
	profileLoadFail,
	profileClear,
} = profileSlice.actions;
export default profileSlice.reducer;
