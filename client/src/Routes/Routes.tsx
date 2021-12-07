import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "../Components/Moleculs/Navbar/Navbar";
import RegisterPage from "../Components/Pages/RegisterPage/RegisterPage";

import { REGISTER_PATH } from "./routesPath";

const PlatformRoutes = () => {
	return (
		<>
			<Router>
				<>
					<Navbar />
					{/* landing */}
					<section className="container">
						<Routes>
							{/* here goes all the routes */}
							<Route path={REGISTER_PATH} element={<RegisterPage />} />
						</Routes>
					</section>
				</>
			</Router>
		</>
	);
};

export default PlatformRoutes;
