import { createSlice } from "@reduxjs/toolkit";
import { ICoursesList } from "../../Interfaces";

interface initialStateInterface {
	loading: boolean;
	error: string | null;
	coursesList?: ICoursesList;
}

const initialState: initialStateInterface = {
	loading: false,
	error: null,
	coursesList: [],
};

export const coursesSlice = createSlice({
	name: "courses",
	initialState,
	reducers: {
		coursesListLoadInit: (state) => {
			state.loading = true;
		},
		coursesListLoadSuccess: (state, action) => {
			state.loading = false;
			state.coursesList = action.payload;
		},
		coursesListLoadFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		coursesListClear: (state) => {
			state.loading = false;
			state.error = null;
			state.coursesList = [];
		},
	},
});

export const {
	coursesListLoadInit,
	coursesListLoadSuccess,
	coursesListLoadFail,
	coursesListClear,
} = coursesSlice.actions;

export default coursesSlice.reducer;
