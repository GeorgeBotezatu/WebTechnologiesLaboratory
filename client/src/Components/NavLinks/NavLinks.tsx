import {
	ABOUT,
	COMMUNITY,
	CONSOLE,
	LEARNING_PATH,
	LOGIN,
	LOGO,
	REGISTER,
} from "../../Utils/constants";
import "./NavLinks.scss";

interface navLinksPropsInterface {
	toggle(): void;
}

const NavLinks: React.FC<navLinksPropsInterface> = ({ toggle }) => {
	const componentClass = "wtl-navbar";
	const burgerClass = `${componentClass}__burger`;
	const burgerLinesClass = `${burgerClass}--line`;
	const burgerLineOneClass = `${burgerClass}--line-one`;
	const burgerLineTwoClass = `${burgerClass}--line-two`;
	const burgerLineThreeClass = `${burgerClass}--line-three`;
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
				</ul>
			</div>
			<div className={authGroupLinks}>
				<a href="">{LOGIN}</a>
				<a href="">{REGISTER}</a>
			</div>
			<div className={burgerClass} onClick={toggle}>
				<span className={`${burgerLinesClass} ${burgerLineOneClass}`}></span>
				<span className={`${burgerLinesClass} ${burgerLineTwoClass}`}></span>
				<span className={`${burgerLinesClass} ${burgerLineThreeClass}`}></span>
			</div>
		</nav>
	);
};
export default NavLinks;
