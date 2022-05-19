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
		editCourseItemInit: (state) => {
			state.loading = true;
		},
		editCourseItemSuccess: (state, action) => {
			state.loading = false;
			let newList;

			newList = state.coursesList?.map((course) => {
				if (course._id === action.payload._id)
					return {
						...course,
						courseDescription: action.payload.courseDescription,
						courseTitle: action.payload.courseTitle,
					};
				else {
					return course;
				}
			}) as ICoursesList;

			state.coursesList = newList;
		},
		editCourseItemFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		coursesListDeleteInit: (state) => {
			state.loading = true;
		},
		coursesListDeleteSuccess: (state, action) => {
			state.loading = false;
			state.coursesList = action.payload;
		},
		coursesListDeleteFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const {
	coursesListLoadInit,
	coursesListLoadSuccess,
	coursesListLoadFail,
	coursesListClear,
	editCourseItemInit,
	editCourseItemSuccess,
	editCourseItemFail,
	coursesListDeleteInit,
	coursesListDeleteSuccess,
	coursesListDeleteFail,
} = coursesSlice.actions;

export default coursesSlice.reducer;
