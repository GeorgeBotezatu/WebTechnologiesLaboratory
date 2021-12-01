import "./Navbar.scss";

const Navbar: React.FC = () => {
	const componentClass = "wtl-navbar";
	const logoLinksClass = `${componentClass}__logo-links`;
	const logoClass = `${logoLinksClass}--logo`;
	const linksGroupClass = `${logoLinksClass}__links-group`;
	const linkClass = `${linksGroupClass}--link`;
	const linkDisabledClass = `${linksGroupClass}--disabled`;
	const authGroupLinks = `${componentClass}__auth-group`;
	return (
		<nav className={componentClass}>
			<div className={logoLinksClass}>
				<h3 className={logoClass}>wtl.</h3>
				<ul className={linksGroupClass}>
					<li className={linkClass}>
						<a href="">Community</a>
					</li>
					<li className={linkClass}>
						<a href="">About</a>
					</li>
					<li className={linkClass}>
						<a href="">Console</a>
					</li>
					<li className={linkDisabledClass}>
						<a href="">LearningPath</a>
					</li>
				</ul>
			</div>
			<div className={authGroupLinks}>
				<a href="">Login</a>
				<a href="">Register</a>
			</div>
		</nav>
	);
};
export default Navbar;
