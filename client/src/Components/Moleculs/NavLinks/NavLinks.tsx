import { Link } from "react-router-dom";
import { REGISTER_PATH } from "../../../Routes/routesPath";
import {
	ABOUT,
	COMMUNITY,
	CONSOLE,
	LEARNING_PATH,
	LOGIN,
	LOGO,
	REGISTER,
} from "../../../Utils/constants";
import "./NavLinks.scss";
import classNames from "classnames";
interface navLinksPropsInterface {
	toggle(): void;
	show: boolean;
}

const NavLinks: React.FC<navLinksPropsInterface> = ({ toggle, show }) => {
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
				<h3 className={logoClass}>{LOGO}</h3>
				<ul className={linksGroupClass}>
					<li className={linkClass}>
						<a href="/">{COMMUNITY}</a>
					</li>
					<li className={linkClass}>
						<a href="/">{ABOUT}</a>
					</li>
					<li className={linkClass}>
						<a href="/">{CONSOLE}</a>
					</li>
					<li className={linkDisabledClass}>
						<a href="/">{LEARNING_PATH}</a>
					</li>
				</ul>
			</div>
			<div className={authGroupLinks}>
				<a href="/">{LOGIN}</a>
				<Link to={REGISTER_PATH}>{REGISTER}</Link>
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
