import "./NavLinks.scss";
import { Link } from "react-router-dom";

import {
	CONSOLE_PATH,
	LANDING_PATH,
	LOGIN_PATH,
	PROFILE_PATH,
	REGISTER_PATH,
	LEARNING_PATH,
	COMMUNITY_PATH,
	ABOUT_PATH,
} from "../../../../Routes/routesPath";
import {
	ABOUT,
	COMMUNITY,
	CONSOLE,
	LEARNINGPATH,
	LOGIN,
	LOGO,
	LOGOUT,
	PROFILE,
	REGISTER,
} from "../../../../Utils/constants";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../Store/Store";
import { logout } from "../../../../Store/features/registerSlice";
import { profileClear } from "../../../../Store/features/profileSlice";
import { deleteCookie } from "../../../../Utils/utilFunctions";
import { coursesListClear } from "../../../../Store/features/coursesSlice";

interface navLinksPropsInterface {
	toggle(): void;
	show: boolean;
}

const NavLinks: React.FC<navLinksPropsInterface> = ({ toggle, show }) => {
	const { isAuthenticated } = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();
	const logouHandler = async () => {
		dispatch(profileClear());
		dispatch(coursesListClear());
		dispatch(logout());
		deleteCookie();
		window.location.reload();
	};
	const componentClass = "wtl-navbar";
	const burgerClass = `${componentClass}__burger`;
	const burgerLinesClass = `${burgerClass}--line`;
	const logoLinksClass = `${componentClass}__logo-links`;
	const logoClass = `${logoLinksClass}--logo`;
	const linksGroupClass = `${logoLinksClass}__links-group`;
	const linkClass = `${linksGroupClass}--link`;
	const linkDisabledClass = `${linksGroupClass}--disabled`;
	const authGroupLinks = `${componentClass}__auth-group`;
	return (
		<nav className={componentClass}>
			<div className={logoLinksClass}>
				<Link to={LANDING_PATH} className={logoClass}>
					{LOGO}
				</Link>
				<ul className={linksGroupClass}>
					<li className={linkClass}>
						<Link to={COMMUNITY_PATH}>{COMMUNITY}</Link>
					</li>
					<li className={linkClass}>
						<Link to={ABOUT_PATH}>{ABOUT}</Link>
					</li>
					<li className={linkClass}>
						<Link to={CONSOLE_PATH}>{CONSOLE}</Link>
					</li>
					<li className={isAuthenticated ? linkClass : linkDisabledClass}>
						<Link to={LEARNING_PATH}>{LEARNINGPATH}</Link>
					</li>
				</ul>
			</div>
			<div className={authGroupLinks}>
				{isAuthenticated ? (
					<>
						<Link className={`${authGroupLinks}--bar`} to={PROFILE_PATH}>
							{PROFILE}
						</Link>
						<Link
							onClick={() => {
								logouHandler();
							}}
							to="/"
						>
							{LOGOUT}
						</Link>
					</>
				) : (
					<>
						<Link className={`${authGroupLinks}--bar`} to={LOGIN_PATH}>
							{LOGIN}
						</Link>
						<Link to={REGISTER_PATH}>{REGISTER}</Link>
					</>
				)}
			</div>
			<div
				className={show ? classNames(burgerClass, "open") : burgerClass}
				onClick={toggle}
			>
				<span
					className={
						show ? classNames(burgerLinesClass, "open") : burgerLinesClass
					}
				></span>
				<span
					className={
						show ? classNames(burgerLinesClass, "open") : burgerLinesClass
					}
				></span>
				<span
					className={
						show ? classNames(burgerLinesClass, "open") : burgerLinesClass
					}
				></span>
			</div>
		</nav>
	);
};
export default NavLinks;
