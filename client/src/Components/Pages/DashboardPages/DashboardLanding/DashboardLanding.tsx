import "./DashboardLanding.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	clearDashboard,
	dashboardLoadFail,
	dashboardLoadInit,
	dashboardLoadSuccess,
} from "../../../../Store/features/dashboardStatsSlice";
import { getDashboardStats } from "../../../../API/dashboardApi";
import { CAN_NOT_LOAD_DASHBOARD_STATS } from "../../../../Utils/constants";
import { RootState } from "../../../../Store/Store";
import { calcultateDays } from "../../../../Utils/utilFunctions";
import { useLocation, useNavigate } from "react-router";
import { VictoryPie } from "victory";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
const DashboardLanding: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { pathname } = useLocation();
	useEffect(() => {
		const loadCourseHandler = async () => {
			dispatch(dashboardLoadInit());
			try {
				const res = await getDashboardStats();
				if (!res) {
					dispatch(dashboardLoadFail(CAN_NOT_LOAD_DASHBOARD_STATS));
				} else {
					dispatch(dashboardLoadSuccess(res));
				}
			} catch (error: any) {
				console.log(error);
				dispatch(dashboardLoadFail(error.message));
			}
		};
		loadCourseHandler();
	}, [dispatch]);

	const { dashboardStats } = useSelector(
		(state: RootState) => state.dashboardStats
	);

	const componentClass = "wtl-dashboard-landing";
	const titleClass = `${componentClass}--title`;
	const descriptionClass = `${componentClass}--description`;
	const statsClass = `${componentClass}__stats`;
	const usersContainerClass = `${statsClass}__users-container`;
	const postsContainerClass = `${statsClass}__posts-container`;
	const userContainerClass = `${usersContainerClass}__user`;
	const userImgClass = `${userContainerClass}--img`;
	const userInfoClass = `${userContainerClass}--info`;
	const postContainerClass = `${postsContainerClass}__post`;
	const postImgClass = `${postContainerClass}--img`;
	const postInfoClass = `${postContainerClass}--info`;
	const statsTitleClass = `${componentClass}--stats-title`;
	const chartContainerClass = `${componentClass}__chart-container`;
	const targetsContainerClass = `${componentClass}__targets-container`;
	return (
		<>
			{!pathname.includes("/stats") ? (
				<div className={componentClass}>
					<h1 className={titleClass}>Welcome back Admin!</h1>
					<p className={descriptionClass}>
						Here are some of the recent activity on your platform:{" "}
					</p>
					<div className={statsClass}>
						<div className={usersContainerClass}>
							<h1>Latest users joined</h1>

							{dashboardStats &&
								dashboardStats?.latestUser?.map((user) => {
									return (
										<div className={userContainerClass} key={user._id}>
											<div className={userImgClass}>
												<img src={user?.avatar} alt="user-avatar" />
											</div>
											<div className={userInfoClass}>
												<h2>{user?.name}</h2>
												<p>{user.email}</p>
												<p>Registered: {calcultateDays(user.data)} days ago</p>
											</div>
										</div>
									);
								})}
						</div>
						<div className={postsContainerClass}>
							<h1>Latest posts</h1>
							{dashboardStats &&
								dashboardStats?.latestPost?.map((post) => {
									return (
										<div
											onClick={() => {
												navigate(`/community/post/${post?._id}`);
												dispatch(clearDashboard());
											}}
											className={postContainerClass}
											key={post._id}
										>
											<div className={postImgClass}>
												<img src={post?.avatar} alt="post-avatar" />
											</div>
											<div className={postInfoClass}>
												<h2>{post?.name}</h2>
												<p>{post?.text}</p>
												<p>Posted: {calcultateDays(post.date)} days ago</p>
											</div>
										</div>
									);
								})}
						</div>
					</div>
				</div>
			) : (
				<div className={componentClass}>
					<h1 className={statsTitleClass}>
						Here are some awesome stats about your platform!
					</h1>

					<div className={targetsContainerClass}>
						<div>
							<CircularProgressbar
								value={Number(dashboardStats?.numberOfUsers) % 100}
								text={`${Number(dashboardStats?.numberOfUsers)}`}
								styles={buildStyles({
									textColor: "yellow",
									pathColor: "orange",
									trailColor: "gray",
								})}
							/>
							<h1>User registered Target(100)</h1>
						</div>
						<div>
							<CircularProgressbar
								value={(Number(dashboardStats?.numberOfProblems) * 100) / 10}
								text={`${Number(dashboardStats?.numberOfProblems)}`}
								styles={buildStyles({
									textColor: "yellow",
									pathColor: "red",
									trailColor: "gray",
								})}
							/>
							<h1>Problems on platform</h1>
							<p>DO NOT ACHIVE THIS!</p>
						</div>
					</div>
					<div className={chartContainerClass}>
						<VictoryPie
							data={[
								{
									x: " Users",
									y: Math.round(Number(dashboardStats?.numberOfUsers) / 2),
								},
								{ x: "Courses", y: dashboardStats?.numberOfCourses },
								{
									x: "Chapters",
									y: dashboardStats?.numberOfChapters,
								},
								{
									x: "Problems",
									y: dashboardStats?.numberOfProblems,
								},
								{ x: "Posts", y: dashboardStats?.numberOfPosts },
							]}
							colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
							radius={({ datum }) => 20 + datum.y * 4}
							style={{
								labels: { fill: "white", fontSize: 10, fontWeight: "bold" },
							}}
							labels={({ datum }) => `${datum.x}: ${datum.y}`}
							labelPosition={({ datum }) => (datum ? "centroid" : "startAngle")}
							labelPlacement={({ datum }) => (datum ? "parallel" : "vertical")}
							labelRadius={({ innerRadius }) => Number(innerRadius) + 100}
						/>
						<h1>This chart is to indicate how many items we have in the DB!</h1>
					</div>
				</div>
			)}
		</>
	);
};

export default DashboardLanding;
