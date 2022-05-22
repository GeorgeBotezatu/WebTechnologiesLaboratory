import { createSlice } from "@reduxjs/toolkit";
import { ICourse } from "../../Interfaces";
interface initialStateInterface {
	loading: boolean;
	error: string | null;
	course?: ICourse;
}

const initialState: initialStateInterface = {
	loading: false,
	error: null,
	course: {},
};

export const courseSlice = createSlice({
	name: "course",
	initialState,
	reducers: {
		courseLoadInit: (state) => {
			state.loading = true;
		},
		courseLoadSuccess: (state, action) => {
			state.loading = false;
			state.course = action.payload;
		},
		courseLoadFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		clearCourse: (state) => {
			state.loading = false;
			state.error = "";
			state.course = {};
		},
		chapterCreateInit: (state) => {
			state.loading = true;
		},
		chapterCreateSuccess: (state, action) => {
			state.loading = false;
			state.course = action.payload;
		},
		chapterCreateFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		chapterDeleteInit: (state) => {
			state.loading = true;
		},
		chapterDeleteSuccess: (state, action) => {
			state.loading = false;
			state.course = action.payload;
		},
		chapterDeleteFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		changeChapterOrderInit: (state) => {
			state.loading = true;
		},
		changeChapterOrderSuccess: (state, action) => {
			state.loading = false;
			state.course = action.payload;
		},
		changeChapterOrderFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		addQuizInit: (state) => {
			state.loading = true;
		},
		addQuizSuccess: (state, action) => {
			state.loading = false;
			state.course = action.payload;
		},
		addQuizFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const {
	courseLoadInit,
	courseLoadFail,
	courseLoadSuccess,
	clearCourse,
	chapterCreateInit,
	chapterCreateSuccess,
	chapterCreateFail,
	chapterDeleteInit,
	chapterDeleteSuccess,
	chapterDeleteFail,
	changeChapterOrderInit,
	changeChapterOrderSuccess,
	changeChapterOrderFail,
	addQuizInit,
	addQuizSuccess,
	addQuizFail,
} = courseSlice.actions;
export default courseSlice.reducer;
