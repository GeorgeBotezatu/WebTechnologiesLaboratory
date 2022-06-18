import "./Footer.scss";
import React, { useState } from "react";
import { useLocation } from "react-router";
import PopUpBox from "../PopUpBox/PopUpBox";
import ReportProblemForm from "../ReportProblemForm/ReportProblemForm";
import { useSelector } from "react-redux";
import { RootState } from "../../../Store/Store";

const Footer: React.FC = () => {
	const { isAuthenticated } = useSelector((state: RootState) => state.auth);
	const [buttonPopup, setButtonPopup] = useState<boolean>(false);
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
						{isAuthenticated && (
							<div className={problemContainerClass}>
								<h1>Report a problem</h1>
								<button
									onClick={() => {
										setButtonPopup(true);
									}}
								>
									Report
								</button>
							</div>
						)}
					</div>
					<div className={rightsClass}>
						<p>© 2022 Web Technologies Laboratory. All rights reserved. </p>
					</div>
				</div>
			) : (
				""
			)}
			<PopUpBox trigger={buttonPopup} setTrigger={setButtonPopup}>
				<ReportProblemForm setTrigger={setButtonPopup} />
			</PopUpBox>
		</>
	);
};

export default Footer;
