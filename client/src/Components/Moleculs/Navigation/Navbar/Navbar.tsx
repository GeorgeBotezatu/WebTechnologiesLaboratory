import "./Navbar.scss";
import { useState } from "react";
import NavLinks from "../NavLinks/NavLinks";
import SideDrawer from "../SideDrawer/SideDrawer";
import Backdrop from "../BackDrop/Backdrop";

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
			{!pathname.includes("/dashboard") ? (
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
