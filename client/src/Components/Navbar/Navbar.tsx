import "./Navbar.scss";
import NavLinks from "../NavLinks/NavLinks";
import SideDrawer from "../SideDrawer/SideDrawer";
const Navbar: React.FC = () => {
	return (
		<div className="wtl-main-navbar">
			<SideDrawer />
			<NavLinks />
		</div>
	);
};
export default Navbar;
