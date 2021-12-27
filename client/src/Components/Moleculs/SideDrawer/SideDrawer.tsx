import "./SideDrawer.scss";

import {
	COMMUNITY,
	LOGIN,
	REGISTER,
	ABOUT,
	CONSOLE,
	LEARNING_PATH,
	OPEN,
} from "../../../Utils/constants";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { LOGIN_PATH, REGISTER_PATH } from "../../../Routes/routesPath";

interface sideDrawerProps {
	show: boolean;
}

const SideDrawer: React.FC<sideDrawerProps> = ({ show }) => {
	const componentClass = "wtl-side-drawer";
	const linksGroupClass = `${componentClass}__links-group`;
	const linkClass = `${linksGroupClass}--link`;
	const linkDisabledClass = `${linksGroupClass}--disabled`;
	const communityClass = `${linkClass}--community`;
	const aboutClass = `${linkClass}--about`;
	const consoleClass = `${linkClass}--console`;
	const learningPathClass = `${linkClass}--learning-path`;
	const loginClass = `${linkClass}--login`;
	const registerClass = `${linkClass}--register`;

	return (
		<div className={show ? classNames(componentClass, OPEN) : componentClass}>
			<ul className={linksGroupClass}>
				<li
					className={
						show ? classNames(linkClass, communityClass, OPEN) : communityClass
					}
				>
					<a href="/">{COMMUNITY}</a>
				</li>
				<li
					className={
						show ? classNames(linkClass, aboutClass, OPEN) : aboutClass
					}
				>
					<a href="/">{ABOUT}</a>
				</li>
				<li
					className={
						show ? classNames(linkClass, consoleClass, OPEN) : consoleClass
					}
				>
					<a href="/">{CONSOLE}</a>
				</li>
				<li
					className={
						show
							? classNames(linkDisabledClass, learningPathClass, OPEN)
							: learningPathClass
					}
				>
					<a href="/">{LEARNING_PATH}</a>
				</li>
				<li
					className={
						show ? classNames(linkClass, loginClass, OPEN) : loginClass
					}
				>
					<Link to={LOGIN_PATH}>{LOGIN}</Link>
				</li>
				<li
					className={
						show ? classNames(linkClass, registerClass, OPEN) : registerClass
					}
				>
					<Link to={REGISTER_PATH}>{REGISTER}</Link>
				</li>
			</ul>
		</div>
	);
};
export default SideDrawer;
