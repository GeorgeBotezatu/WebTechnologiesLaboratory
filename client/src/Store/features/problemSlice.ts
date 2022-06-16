import { createSlice } from "@reduxjs/toolkit";
import { IProblemArr } from "../../Interfaces";

interface initialStateInterface {
	loading: boolean;
	error: string | null;
	problemList?: IProblemArr;
}

const initialState: initialStateInterface = {
	loading: false,
	error: null,
	problemList: [],
};

export const problemSlice = createSlice({
	name: "problem",
	initialState,
	reducers: {
		problemLoadInit: (state) => {
			state.loading = true;
		},
		problemLoadSuccess: (state, action) => {
			state.loading = false;
			state.problemList = action.payload;
		},
		problemLoadFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		problemDeleteInit: (state) => {
			state.loading = true;
		},
		problemDeleteSuccess: (state, action) => {
			state.loading = false;
			state.problemList = action.payload;
		},
		problemDeleteFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		problemAddInit: (state) => {
			state.loading = true;
		},
		problemAddSuccess: (state, action) => {
			state.loading = false;
			let newList = state.problemList;
			newList?.push(action.payload);
			state.problemList = newList;
		},
		problemAddFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		problemClear: (state) => {
			state.loading = false;
			state.error = "";
			state.problemList = [];
		},
	},
});

export const {
	problemAddFail,
	problemAddInit,
	problemAddSuccess,
	problemDeleteFail,
	problemDeleteInit,
	problemDeleteSuccess,
	problemLoadFail,
	problemLoadInit,
	problemLoadSuccess,
	problemClear,
} = problemSlice.actions;

export default problemSlice.reducer;
