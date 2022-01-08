import React from "react";
import { Navigate } from "react-router";
import { LOGIN_PATH } from "../../../Routes/routesPath";
import { getToken } from "../../../Utils/utilFunctions";

const PrivateRoute: React.FC<any> = ({ children }) => {
	return getToken() ? children : <Navigate to={LOGIN_PATH} />;
};

export default PrivateRoute;
