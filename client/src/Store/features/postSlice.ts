import { createSlice } from "@reduxjs/toolkit";
import { IPost } from "../../Interfaces";

interface initialStateInterface {
	loading: boolean;
	error: string | null;
	post?: IPost;
}

const initialState: initialStateInterface = {
	loading: false,
	error: null,
	post: {},
};

export const postSlice = createSlice({
	name: "post",
	initialState,
	reducers: {
		postLoadInit: (state) => {
			state.loading = true;
		},
		postLoadSuccess: (state, action) => {
			state.loading = false;
			state.post = action.payload;
		},
		postLoadFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		postLikeInit: (state) => {
			state.loading = true;
		},
		postLikeSuccess: (state, action) => {
			state.loading = false;
			state.post = action.payload;
		},
		postLikeFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		addCommentInit: (state) => {
			state.loading = true;
		},
		addCommentSuccess: (state, action) => {
			state.loading = false;
			state.post = action.payload;
		},
		addCommentFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		deleteCommentInit: (state) => {
			state.loading = true;
		},
		deleteCommentSuccess: (state, action) => {
			state.loading = false;
			state.post = action.payload;
		},
		deleteCommentFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const {
	postLoadFail,
	postLoadInit,
	postLoadSuccess,
	postLikeFail,
	postLikeInit,
	postLikeSuccess,
	addCommentFail,
	addCommentInit,
	addCommentSuccess,
	deleteCommentFail,
	deleteCommentInit,
	deleteCommentSuccess,
} = postSlice.actions;

export default postSlice.reducer;
