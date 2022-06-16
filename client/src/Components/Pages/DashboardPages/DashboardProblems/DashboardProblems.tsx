import "./DashboardProblems.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../Store/Store";
import {
	problemLoadFail,
	problemLoadInit,
	problemLoadSuccess,
} from "../../../../Store/features/problemSlice";
import { getProblemList } from "../../../../API/dashboardApi";
import { CAN_NOT_GET_PROBLEMS } from "../../../../Utils/constants";
import ProblemItem from "../../../Moleculs/Dashboard/ProblemItem/ProblemItem";

const DashboardProblems: React.FC = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const loadPlatformData = async () => {
			try {
				dispatch(problemLoadInit());
				const res = await getProblemList();
				if (!res) {
					dispatch(problemLoadFail(CAN_NOT_GET_PROBLEMS));
				} else {
					dispatch(problemLoadSuccess(res));
				}
			} catch (error: any) {
				dispatch(problemLoadFail(error.message));
				console.log(error);
			}
		};
		loadPlatformData();
	}, [dispatch]);

	const { problemList } = useSelector(
		(state: RootState) => state.dashboardProblems
	);
	useEffect(() => {}, [problemList]);

	const componentClass = "wtl-dashboard-problems";
	const titleClass = `${componentClass}--title`;
	const problemsContainerClass = `${componentClass}__problems`;
	return (
		<div className={componentClass}>
			<h1 className={titleClass}>Reported Problems</h1>
			<div className={problemsContainerClass}>
				{problemList &&
					problemList.map((item) => {
						return <ProblemItem key={item?._id} problemItem={item} />;
					})}
			</div>
		</div>
	);
};

export default DashboardProblems;
