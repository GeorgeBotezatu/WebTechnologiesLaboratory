import "./NavLinks.scss";
import { Link } from "react-router-dom";

import {
	CONSOLE_PATH,
	LANDING_PATH,
	LOGIN_PATH,
	PROFILE_PATH,
	REGISTER_PATH,
} from "../../../../Routes/routesPath";
import {
	ABOUT,
	COMMUNITY,
	CONSOLE,
	LEARNING_PATH,
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
interface navLinksPropsInterface {
	toggle(): void;
	show: boolean;
}

const NavLinks: React.FC<navLinksPropsInterface> = ({ toggle, show }) => {
	const { isAuthenticated } = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();

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
						<a href="/">{COMMUNITY}</a>
					</li>
					<li className={linkClass}>
						<a href="/">{ABOUT}</a>
					</li>
					<li className={linkClass}>
						<a href={CONSOLE_PATH}>{CONSOLE}</a>
					</li>
					<li className={isAuthenticated ? linkClass : linkDisabledClass}>
						<a href="/">{LEARNING_PATH}</a>
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
								deleteCookie();
								dispatch(profileClear());
								dispatch(logout());
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
