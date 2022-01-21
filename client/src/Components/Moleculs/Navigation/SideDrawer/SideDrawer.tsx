import "./SideDrawer.scss";

import {
	COMMUNITY,
	LOGIN,
	REGISTER,
	ABOUT,
	CONSOLE,
	LEARNING_PATH,
	OPEN,
	LOGOUT,
	PROFILE,
} from "../../../../Utils/constants";
import classNames from "classnames";
import { Link } from "react-router-dom";
import {
	LOGIN_PATH,
	PROFILE_PATH,
	REGISTER_PATH,
} from "../../../../Routes/routesPath";
import { RootState } from "../../../../Store/Store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../Store/features/registerSlice";
import { profileClear } from "../../../../Store/features/profileSlice";
import { deleteCookie } from "../../../../Utils/utilFunctions";

interface sideDrawerProps {
	show: boolean;
}

const SideDrawer: React.FC<sideDrawerProps> = ({ show }) => {
	const { isAuthenticated } = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();

	const componentClass = "wtl-side-drawer";
	const linksGroupClass = `${componentClass}__links-group`;
	const linkClass = `${linksGroupClass}--link`;
	const linkDisabledClass = `${linksGroupClass}--disabled`;
	const communityClass = `${linkClass}--community`;
	const aboutClass = `${linkClass}--about`;
	const consoleClass = `${linkClass}--console`;
	const learningPathClass = `${linkClass}--learning-path`;
	const loginClass = `${linkClass}--login`;
	const profileClass = `${linkClass}--profile`;
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
				{isAuthenticated ? (
					<li
						className={
							show
								? classNames(linkClass, consoleClass, OPEN)
								: learningPathClass
						}
					>
						<a href="/">{LEARNING_PATH}</a>
					</li>
				) : (
					<li
						className={
							show
								? classNames(linkDisabledClass, learningPathClass, OPEN)
								: learningPathClass
						}
					>
						<a href="/">{LEARNING_PATH}</a>
					</li>
				)}

				{isAuthenticated ? (
					<>
						<li
							className={
								show ? classNames(linkClass, profileClass, OPEN) : profileClass
							}
						>
							<Link to={PROFILE_PATH}>{PROFILE}</Link>
						</li>
						<li
							className={
								show ? classNames(linkClass, loginClass, OPEN) : loginClass
							}
						>
							<Link
								onClick={() => {
									deleteCookie();
									dispatch(profileClear());
									dispatch(logout());
								}}
								to="/"
							>
								{LOGOUT}
							</Link>
						</li>
					</>
				) : (
					<>
						<li
							className={
								show ? classNames(linkClass, loginClass, OPEN) : loginClass
							}
						>
							<Link to={LOGIN_PATH}>{LOGIN}</Link>
						</li>
						<li
							className={
								show
									? classNames(linkClass, registerClass, OPEN)
									: registerClass
							}
						>
							<Link to={REGISTER_PATH}>{REGISTER}</Link>
						</li>
					</>
				)}
			</ul>
		</div>
	);
};
export default SideDrawer;