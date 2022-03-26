import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "../Components/Atoms/PrivateRoute/PrivateRoute";
import Navbar from "../Components/Moleculs/Navigation/Navbar/Navbar";
import ConsolePage from "../Components/Pages/ConsolePage/ConsolePage";
import EditAboutPage from "../Components/Pages/EditAboutPage/EditAboutPage";
import EditEducationPage from "../Components/Pages/EditEducationPage/EditEducationPage";
import EditExperiencePage from "../Components/Pages/EditExperiencePage/EditExperiencePage";
import EditSocialPage from "../Components/Pages/EditSocialPage/EditSocialPage";
import LandingPage from "../Components/Pages/LandingPage/LandingPage";
import LoginPage from "../Components/Pages/LoginPage/LoginPage";
import ProfilePage from "../Components/Pages/ProfilePage/ProfilePage";
import RegisterPage from "../Components/Pages/RegisterPage/RegisterPage";

import {
	ADD_EDUCATION,
	ADD_EXPERIENCE,
	CONSOLE_PATH,
	EDIT_EDUCATION,
	EDIT_EXPERIENCE,
	EDIT_SOCIAL,
	LANDING_PATH,
	LOGIN_PATH,
	MODIFY_ABOUT_PATH,
	PROFILE_PATH,
	REGISTER_PATH,
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
						</Routes>
					</>
				</>
			</Router>
		</>
	);
};

export default PlatformRoutes;
