import "./CvModelOne.scss";
import React from "react";
import JsPDF from "jspdf";

import { useSelector } from "react-redux";
import { RootState } from "../../../Store/Store";

const CvModelOne: React.FC<any> = React.forwardRef((props, ref) => {
	const { userProfile } = useSelector((state: RootState) => state.userProfile);

	const generatePDF = async () => {
		const report = new JsPDF("portrait", "px");
		await report.html(document.querySelector("#cv") as HTMLElement).then(() => {
			report.save("report.pdf");
		});
	};

	const componentClass = "wtl-cv-one";
	const leftSideClass = `${componentClass}__left-side`;
	const rightSideClass = `${componentClass}__right-side`;
	const nameClass = `${leftSideClass}--name`;
	const emailClass = `${leftSideClass}--email`;
	const websiteClass = `${leftSideClass}--website`;
	const skillsClass = `${leftSideClass}--skills`;
	const statusClass = `${leftSideClass}--status`;
	const descriptionClass = `${rightSideClass}--description`;

	return (
		<>
			<div ref={ref as any} id="cv" className={componentClass}>
				<div className={leftSideClass}>
					<h1 className={nameClass}>{userProfile?.user?.name}</h1>
					<p className={emailClass}>
						<span>Email: </span> {userProfile?.user?.email}
					</p>
					<p className={websiteClass}>
						<span>Personal Website: </span>
						{userProfile?.about?.website}
					</p>
					<div className={skillsClass}>
						<h1>My skills:</h1>
						<div>
							{userProfile?.about?.skills &&
								userProfile.about.skills.map((skill, index) => {
									return <p key={index}>{skill}</p>;
								})}
						</div>
						<p className={statusClass}>
							<span>Current Status: </span> {userProfile?.about?.status}
						</p>
					</div>
				</div>

				<div className={rightSideClass}>
					<p className={descriptionClass}>
						<span>Short Description:</span> {userProfile?.about?.bio}
					</p>
				</div>
			</div>
			<button onClick={generatePDF}>Export CV</button>
		</>
	);
});

export default CvModelOne;
