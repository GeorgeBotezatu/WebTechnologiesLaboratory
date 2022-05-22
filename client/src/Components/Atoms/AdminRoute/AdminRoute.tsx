import React from "react";
import { Navigate } from "react-router";
import { LANDING_PATH } from "../../../Routes/routesPath";
import { TRUE } from "../../../Utils/constants";
import { getAdminCookie, getToken } from "../../../Utils/utilFunctions";

const AdminRoute: React.FC<any> = ({ children }) => {
	return getToken() && getAdminCookie() === TRUE ? (
		children
	) : (
		<Navigate to={LANDING_PATH} />
	);
};

export default AdminRoute;
