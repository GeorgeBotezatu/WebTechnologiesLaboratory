import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "../Components/Moleculs/Navbar/Navbar";
import LandingPage from "../Components/Pages/LandingPage/LandingPage";
import RegisterPage from "../Components/Pages/RegisterPage/RegisterPage";

import { LANDING_PATH, REGISTER_PATH } from "./routesPath";

const PlatformRoutes = () => {
	return (
		<>
			<Router>
				<>
					<Navbar />

					<section className="container">
						<Routes>
							{/* here goes all the routes */}
							<Route path={LANDING_PATH} element={<LandingPage />} />
							<Route path={REGISTER_PATH} element={<RegisterPage />} />
						</Routes>
					</section>
				</>
			</Router>
		</>
	);
};

export default PlatformRoutes;
