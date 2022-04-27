import "./Navbar.scss";
import { useState } from "react";
import NavLinks from "../NavLinks/NavLinks";
import SideDrawer from "../SideDrawer/SideDrawer";
import Backdrop from "../BackDrop/Backdrop";
import {
	DASHBOARD_LEARNING_PATH,
	DASHBOARD_PATH,
	DASHBOARD_REPORTS_PATH,
	DASHBOARD_STATS_PATH,
} from "../../../../Routes/routesPath";
import { useLocation } from "react-router";
import DashboardNavLinks from "../DashboardNavLinks/DashboardNavLinks";
const Navbar: React.FC = () => {
	const [drawerState, setDrawerState] = useState<boolean>(false);
	const { pathname } = useLocation();
	const drawerToggleClickHandler = () => {
		setDrawerState(!drawerState);
	};

	const backdropClickHandler = () => {
		setDrawerState(false);
	};

	return (
		<>
			{pathname !== DASHBOARD_PATH &&
			pathname !== DASHBOARD_REPORTS_PATH &&
			pathname !== DASHBOARD_LEARNING_PATH &&
			pathname !== DASHBOARD_STATS_PATH ? (
				<div className="wtl-main-navbar" id="top">
					<SideDrawer show={drawerState} />
					{drawerState ? <Backdrop close={backdropClickHandler} /> : <></>}
					<NavLinks toggle={drawerToggleClickHandler} show={drawerState} />
				</div>
			) : (
				<DashboardNavLinks />
			)}
		</>
	);
};
export default Navbar;
