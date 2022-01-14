import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "../Components/Atoms/PrivateRoute/PrivateRoute";
import Navbar from "../Components/Moleculs/Navigation/Navbar/Navbar";
import EditAboutPage from "../Components/Pages/EditAboutPage/EditAboutPage";
import LandingPage from "../Components/Pages/LandingPage/LandingPage";
import LoginPage from "../Components/Pages/LoginPage/LoginPage";
import ProfilePage from "../Components/Pages/ProfilePage/ProfilePage";
import RegisterPage from "../Components/Pages/RegisterPage/RegisterPage";

import {
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
						</Routes>
					</>
				</>
			</Router>
		</>
	);
};

export default PlatformRoutes;
