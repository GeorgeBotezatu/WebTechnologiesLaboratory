import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminRoute from "../Components/Atoms/AdminRoute/AdminRoute";
import PrivateRoute from "../Components/Atoms/PrivateRoute/PrivateRoute";
import Navbar from "../Components/Moleculs/Navigation/Navbar/Navbar";
import ConsolePage from "../Components/Pages/ConsolePage/ConsolePage";
import CoursePage from "../Components/Pages/CoursePage/CoursePage";
import DashboardCreateChapter from "../Components/Pages/DashboardPages/DashboardCreateChapter/DashboardCreateChapter";
import DashboardEditQuizPage from "../Components/Pages/DashboardPages/DashboardEditQuizPage/DashboardEditQuizPage";
import DashboardLanding from "../Components/Pages/DashboardPages/DashboardLanding/DashboardLanding";
import DashboardLearningPath from "../Components/Pages/DashboardPages/DashboardLearningPath/DashboardLearningPath";
import EditAboutPage from "../Components/Pages/EditAboutPage/EditAboutPage";
import EditCoursePage from "../Components/Pages/EditCoursePage/EditCoursePage";
import EditEducationPage from "../Components/Pages/EditEducationPage/EditEducationPage";
import EditExperiencePage from "../Components/Pages/EditExperiencePage/EditExperiencePage";
import EditSocialPage from "../Components/Pages/EditSocialPage/EditSocialPage";
import LandingPage from "../Components/Pages/LandingPage/LandingPage";
import LearningPathPage from "../Components/Pages/LearningPathPage/LearningPathPage";
import LoginPage from "../Components/Pages/LoginPage/LoginPage";
import ProfilePage from "../Components/Pages/ProfilePage/ProfilePage";
import RegisterPage from "../Components/Pages/RegisterPage/RegisterPage";

import {
	ADD_EDUCATION,
	ADD_EXPERIENCE,
	CONSOLE_PATH,
	COURSE_PAGE,
	COURSE_PAGE_CHAPTER,
	DASHBOARD_LEARNING_PATH,
	DASHBOARD_LEARNING_PATH_CREATE_CHAPTER,
	DASHBOARD_LEARNING_PATH_EDIT_QUIZ,
	DASHBOARD_LEARNING_PATH_EDIT_CHAPTER,
	DASHBOARD_LEARNING_PATH_EDIT_COURSE,
	DASHBOARD_PATH,
	DASHBOARD_REPORTS_PATH,
	DASHBOARD_STATS_PATH,
	EDIT_CONSOLE_PATH,
	EDIT_COURSE_PATH,
	EDIT_EDUCATION,
	EDIT_EXPERIENCE,
	EDIT_SOCIAL,
	LANDING_PATH,
	LEARNING_PATH,
	LOGIN_PATH,
	MODIFY_ABOUT_PATH,
	PROFILE_PATH,
	REGISTER_PATH,
	DASHBOARD_LEARNING_PATH_CREATE_QUIZ,
	COURSE_PAGE_CHAPTER_QUIZ,
	NEW_COURSE_PATH,
} from "./routesPath";

const PlatformRoutes = () => {
	return (
		<>
			<Router>
				<>
					<Navbar />

					<>
						<Routes>
							{/* here goes all the routes */}
							<Route path={LANDING_PATH} element={<LandingPage />} />
							<Route path={REGISTER_PATH} element={<RegisterPage />} />
							<Route path={LOGIN_PATH} element={<LoginPage />} />
							<Route
								path={PROFILE_PATH}
								element={
									<PrivateRoute>
										<ProfilePage />
									</PrivateRoute>
								}
							/>
							<Route
								path={MODIFY_ABOUT_PATH}
								element={
									<PrivateRoute>
										<EditAboutPage />
									</PrivateRoute>
								}
							/>
							<Route
								path={EDIT_EXPERIENCE}
								element={
									<PrivateRoute>
										<EditExperiencePage />
									</PrivateRoute>
								}
							/>
							<Route
								path={ADD_EXPERIENCE}
								element={
									<PrivateRoute>
										<EditExperiencePage />
									</PrivateRoute>
								}
							/>
							<Route
								path={EDIT_EDUCATION}
								element={
									<PrivateRoute>
										<EditEducationPage />
									</PrivateRoute>
								}
							/>
							<Route
								path={ADD_EDUCATION}
								element={
									<PrivateRoute>
										<EditEducationPage />
									</PrivateRoute>
								}
							/>
							<Route
								path={EDIT_SOCIAL}
								element={
									<PrivateRoute>
										<EditSocialPage />
									</PrivateRoute>
								}
							/>
							<Route path={CONSOLE_PATH} element={<ConsolePage />} />
							<Route
								path={EDIT_CONSOLE_PATH}
								element={
									<PrivateRoute>
										<ConsolePage />
									</PrivateRoute>
								}
							/>
							<Route
								path={LEARNING_PATH}
								element={
									<PrivateRoute>
										<LearningPathPage />
									</PrivateRoute>
								}
							/>
							<Route
								path={COURSE_PAGE}
								element={
									<PrivateRoute>
										<CoursePage />
									</PrivateRoute>
								}
							/>
							<Route
								path={COURSE_PAGE_CHAPTER}
								element={
									<PrivateRoute>
										<CoursePage />
									</PrivateRoute>
								}
							/>
							<Route
								path={COURSE_PAGE_CHAPTER_QUIZ}
								element={
									<PrivateRoute>
										<CoursePage />
									</PrivateRoute>
								}
							/>
							<Route
								path={EDIT_COURSE_PATH}
								element={
									<AdminRoute>
										<EditCoursePage />
									</AdminRoute>
								}
							/>
							<Route
								path={NEW_COURSE_PATH}
								element={
									<AdminRoute>
										<EditCoursePage />
									</AdminRoute>
								}
							/>
							<Route
								path={DASHBOARD_PATH}
								element={
									<AdminRoute>
										<DashboardLanding />
									</AdminRoute>
								}
							/>
							<Route
								path={DASHBOARD_LEARNING_PATH}
								element={
									<AdminRoute>
										<DashboardLearningPath />
									</AdminRoute>
								}
							/>
							<Route
								path={DASHBOARD_LEARNING_PATH_EDIT_COURSE}
								element={
									<AdminRoute>
										<DashboardLearningPath />
									</AdminRoute>
								}
							/>
							<Route
								path={DASHBOARD_LEARNING_PATH_CREATE_CHAPTER}
								element={
									<AdminRoute>
										<DashboardCreateChapter />
									</AdminRoute>
								}
							/>
							<Route
								path={DASHBOARD_LEARNING_PATH_EDIT_CHAPTER}
								element={
									<AdminRoute>
										<DashboardCreateChapter />
									</AdminRoute>
								}
							/>
							<Route
								path={DASHBOARD_LEARNING_PATH_EDIT_QUIZ}
								element={
									<AdminRoute>
										<DashboardEditQuizPage />
									</AdminRoute>
								}
							/>
							<Route
								path={DASHBOARD_LEARNING_PATH_CREATE_QUIZ}
								element={
									<AdminRoute>
										<DashboardEditQuizPage />
									</AdminRoute>
								}
							/>
							<Route
								path={DASHBOARD_STATS_PATH}
								element={
									<AdminRoute>
										<DashboardLanding />
									</AdminRoute>
								}
							/>
							<Route
								path={DASHBOARD_REPORTS_PATH}
								element={
									<AdminRoute>
										<DashboardLanding />
									</AdminRoute>
								}
							/>
						</Routes>
					</>
				</>
			</Router>
		</>
	);
};

export default PlatformRoutes;
