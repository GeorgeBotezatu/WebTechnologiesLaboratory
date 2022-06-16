import "./Footer.scss";
import React from "react";
import { useLocation } from "react-router";

const Footer: React.FC = () => {
	const { pathname } = useLocation();
	const componentClass = "wtl-footer";
	const upperSectionClass = `${componentClass}__upper`;
	const contactContainerClass = `${upperSectionClass}__contact`;
	const problemContainerClass = `${upperSectionClass}__problem`;
	const rightsClass = `${componentClass}--rights`;
	return (
		<>
			{!pathname.includes("/dashboard") ? (
				<div className={componentClass}>
					<div className={upperSectionClass}>
						<div className={contactContainerClass}>
							<h1>Contact</h1>
							<p>george.botezat00u@e-uvt.ro</p>
						</div>
						<div className={problemContainerClass}>
							<h1>Report a problem</h1>
							<button>Report</button>
						</div>
					</div>
					<div className={rightsClass}>
						<p>© 2022 Web Technologies Laboratory. All rights reserved. </p>
					</div>
				</div>
			) : (
				""
			)}
		</>
	);
};

export default Footer;
