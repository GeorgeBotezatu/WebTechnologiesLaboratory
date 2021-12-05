import "./Navbar.scss";
import { useState } from "react";
import NavLinks from "../NavLinks/NavLinks";
import SideDrawer from "../SideDrawer/SideDrawer";
import Backdrop from "../BackDrop/Backdrop";
const Navbar: React.FC = () => {
	const [drawerState, setDrawerState] = useState<boolean>(false);

	const drawerToggleClickHandler = () => {
		setDrawerState(!drawerState);
	};

	const backdropClickHandler = () => {
		setDrawerState(false);
	};

	return (
		<div className="wtl-main-navbar">
			<SideDrawer show={drawerState} />
			{drawerState ? <Backdrop close={backdropClickHandler} /> : <></>}
			<NavLinks toggle={drawerToggleClickHandler} />
		</div>
	);
};
export default Navbar;
