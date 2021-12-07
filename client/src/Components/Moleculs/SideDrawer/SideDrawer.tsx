import "./SideDrawer.scss";
import {
	COMMUNITY,
	LOGIN,
	REGISTER,
	ABOUT,
	CONSOLE,
	LEARNING_PATH,
} from "../../../Utils/constants";
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
		<div className={show ? `${componentClass} open` : componentClass}>
			<ul className={linksGroupClass}>
				<li
					className={
						show ? `${linkClass} ${communityClass} open` : communityClass
					}
				>
					<a href="/">{COMMUNITY}</a>
				</li>
				<li className={show ? `${linkClass} ${aboutClass} open` : aboutClass}>
					<a href="/">{ABOUT}</a>
				</li>
				<li
					className={show ? `${linkClass} ${consoleClass} open` : consoleClass}
				>
					<a href="/">{CONSOLE}</a>
				</li>
				<li
					className={
						show
							? `${linkDisabledClass} ${learningPathClass} open`
							: learningPathClass
					}
				>
					<a href="/">{LEARNING_PATH}</a>
				</li>
				<li className={show ? `${linkClass} ${loginClass} open` : loginClass}>
					<a href="/">{LOGIN}</a>
				</li>
				<li
					className={
						show ? `${linkClass} ${registerClass} open` : registerClass
					}
				>
					<a href="/">{REGISTER}</a>
				</li>
			</ul>
		</div>
	);
};
export default SideDrawer;
