import { createSlice } from "@reduxjs/toolkit";
import { existToken } from "../../Utils/utilFunctions";

const isAuthenticated: boolean = existToken();
interface IAuthState {
	isAuthenticated: boolean;
	loading: boolean;
	error: string | null;
	isAdmin: boolean;
}
const initialState: IAuthState = {
	isAuthenticated: isAuthenticated,
	loading: false,
	error: null,
	isAdmin: false,
};
export const registerSlice = createSlice({
	name: "register",
	initialState,
	reducers: {
		registerInit: (state) => {
			state.loading = true;
		},
		registerSuccess: (state) => {
			state.loading = false;
			state.isAuthenticated = true;
		},
		registerFail: (state, action) => {
			state.loading = false;
			state.isAuthenticated = false;
			state.error = action.payload;
		},
		loginInit: (state) => {
			state.loading = true;
		},
		loginSuccess: (state, action) => {
			state.loading = false;
			state.isAuthenticated = true;
			state.isAdmin = action.payload;
			state.error = "";
		},
		loginFail: (state, action) => {
			state.loading = false;
			state.isAuthenticated = false;
			state.error = action.payload;
		},
		logout: (state) => {
			state.isAuthenticated = false;
			state.isAdmin = false;
		},
		clearAuthenticationError: (state) => {
			state.loading = false;
			state.error = "";
		},
	},
});

export const {
	registerInit,
	registerSuccess,
	registerFail,
	loginFail,
	loginInit,
	loginSuccess,
	logout,
	clearAuthenticationError,
} = registerSlice.actions;
// export const selectUser = (state: IAuthState) => state.user;
export default registerSlice.reducer;
