import { createSlice } from "@reduxjs/toolkit";
import { IDashboardStats } from "../../Interfaces";

interface initialStateInterface {
	loading: boolean;
	error: string | null;
	dashboardStats?: IDashboardStats;
}

const initialState: initialStateInterface = {
	loading: false,
	error: null,
	dashboardStats: {},
};

export const dashboardStatsSlice = createSlice({
	name: "dashboadStats",
	initialState,
	reducers: {
		dashboardLoadInit: (state) => {
			state.loading = true;
		},
		dashboardLoadSuccess: (state, action) => {
			state.loading = false;
			state.dashboardStats = action.payload;
		},
		dashboardLoadFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		clearDashboard: (state) => {
			state.error = "";
			state.dashboardStats = {};
			state.loading = false;
		},
	},
});

export const {
	dashboardLoadFail,
	dashboardLoadInit,
	dashboardLoadSuccess,
	clearDashboard,
} = dashboardStatsSlice.actions;

export default dashboardStatsSlice.reducer;
