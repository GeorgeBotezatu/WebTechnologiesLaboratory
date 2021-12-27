import { createSlice } from "@reduxjs/toolkit";

interface IAuthState {
	isAuthenticated: boolean;
	loading: boolean;
	error: string | null;
}
const initialState: IAuthState = {
	isAuthenticated: false,
	loading: false,
	error: null,
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
		loginSuccess: (state) => {
			state.loading = false;
			state.isAuthenticated = true;
		},
		loginFail: (state, action) => {
			state.loading = false;
			state.isAuthenticated = false;
			state.error = action.payload;
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
} = registerSlice.actions;
// export const selectUser = (state: IAuthState) => state.user;
export default registerSlice.reducer;
