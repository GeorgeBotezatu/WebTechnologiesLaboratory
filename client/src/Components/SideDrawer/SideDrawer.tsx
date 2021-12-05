import "./SideDrawer.scss";
import {
	COMMUNITY,
	LOGIN,
	LOGO,
	REGISTER,
	ABOUT,
	CONSOLE,
	LEARNING_PATH,
} from "../../Utils/constants";
interface sideDrawerProps {
	show: boolean;
}
const SideDrawer: React.FC<sideDrawerProps> = ({ show }) => {
	const componentClass = "wtl-side-drawer";
	const linksGroupClass = `${componentClass}__links-group`;
	const linkClass = `${linksGroupClass}--link`;
	const linkDisabledClass = `${linksGroupClass}--disabled`;

	return (
		<div className={show ? `${componentClass} open` : componentClass}>
			<ul className={linksGroupClass}>
				<li className={linkClass}>
					<a href="">{COMMUNITY}</a>
				</li>
				<li className={linkClass}>
					<a href="">{ABOUT}</a>
				</li>
				<li className={linkClass}>
					<a href="">{CONSOLE}</a>
				</li>
				<li className={linkDisabledClass}>
					<a href="">{LEARNING_PATH}</a>
				</li>
				<li className={linkDisabledClass}>
					<a href="">{LOGIN}</a>
				</li>
				<li className={linkDisabledClass}>
					<a href="">{REGISTER}</a>
				</li>
			</ul>
		</div>
	);
};
export default SideDrawer;
