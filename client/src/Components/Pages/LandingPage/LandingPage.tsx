import "./LandingPage.scss";
import React from "react";
import { DASHBOARD_PATH, REGISTER_PATH } from "../../../Routes/routesPath";
import LandingDesktopSVG from "../../Atoms/LandingDesktopSVG/LandingDesktopSVG";
import LandingPhoneSVG from "../../Atoms/LandingPhoneSVG/LandingPhoneSVG";
import { useSelector } from "react-redux";
import { RootState } from "../../../Store/Store";
import AnimatedButton from "../../Atoms/AnimatedButton/AnimatedButton";
import {
	GREEN,
	LANDING,
	LARGE,
} from "../../Atoms/AnimatedButton/ButtonModifiers";
import { getAdminCookie } from "../../../Utils/utilFunctions";
import { TRUE } from "../../../Utils/constants";

const LandingPage = () => {
	const { isAuthenticated } = useSelector((state: RootState) => state.auth);
	const isAdmin = getAdminCookie();
	const componentClass = "wtl-landing";
	const textSideClass = `${componentClass}__text-side`;
	const descriptionClass = `${textSideClass}--description`;
	const phoneSVGClass = `${textSideClass}--phone-SVG`;
	const successSectionClass = `${textSideClass}__success-section`;
	const successTitleClass = `${successSectionClass}--title`;
	const successStepsClass = `${successSectionClass}__steps`;
	const svgSideClass = `${componentClass}__SVG`;

	return (
		<section className={componentClass}>
			<div className={textSideClass}>
				<h1 className={descriptionClass}>
					<span className={`${descriptionClass}--bold`}>HERE!</span>{" "}
					<span className={`${descriptionClass}--highlighted`}>
						On Web Technologies Laboratory{" "}
					</span>
					you will found 3 learning paths designed{" "}
					<span className={`${descriptionClass}--highlighted`}>for you!</span>
				</h1>
				<div className={phoneSVGClass}>
					<LandingPhoneSVG />
				</div>
				<div className={successSectionClass}>
					<h3 className={successTitleClass}>Success Recipe</h3>
					<div className={successStepsClass}>
						<p>1. Learn - our Learning Path</p>
						<p>2. Code - our Console</p>
						<p>3. Be creative</p>
						<p>4. Repeat 1, 2, 3 on each Learning Path!</p>
					</div>
					{!isAuthenticated && (
						<AnimatedButton
							buttonColor={GREEN}
							buttonDimension={LARGE}
							buttonPosition={LANDING}
							buttonMessage="JOIN US TO ACCESS LEARNING PATH"
							buttonRoute={REGISTER_PATH}
						/>
					)}
					{isAuthenticated && isAdmin === TRUE ? (
						<AnimatedButton
							buttonColor={GREEN}
							buttonDimension={LARGE}
							buttonPosition={LANDING}
							buttonMessage="Go to Dashboard"
							buttonRoute={DASHBOARD_PATH}
						/>
					) : (
						<></>
					)}
				</div>
			</div>
			<div className={svgSideClass}>
				<LandingDesktopSVG />
			</div>
		</section>
	);
};

export default LandingPage;
