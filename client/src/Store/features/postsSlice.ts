import { createSlice } from "@reduxjs/toolkit";
import { IPostsArr } from "../../Interfaces";

interface initialStateInterface {
	loading: boolean;
	error: string | null;
	postsList?: IPostsArr;
}

const initialState: initialStateInterface = {
	loading: false,
	error: null,
	postsList: [],
};

export const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		postsLoadInit: (state) => {
			state.loading = true;
		},
		postsLoadSuccess: (state, action) => {
			state.loading = false;
			state.postsList = action.payload;
		},
		postsLoadFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		postDeleteInit: (state) => {
			state.loading = true;
		},
		postDeleteSuccess: (state, action) => {
			state.loading = false;
			state.postsList = action.payload;
		},
		postDeleteFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const {
	postsLoadFail,
	postsLoadInit,
	postsLoadSuccess,
	postDeleteFail,
	postDeleteInit,
	postDeleteSuccess,
} = postsSlice.actions;

export default postsSlice.reducer;
