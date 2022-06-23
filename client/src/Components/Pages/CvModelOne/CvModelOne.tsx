import "./CvModelOne.scss";
import React from "react";
import JsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useSelector } from "react-redux";
import { RootState } from "../../../Store/Store";
const CvModelOne: React.FC = () => {
	const { userProfile } = useSelector((state: RootState) => state.userProfile);

	const generatePDF = () => {
		const input = document.getElementById("cv") as HTMLElement;
		html2canvas(input).then((canvas) => {
			try {
				const imgData = canvas.toDataURL("image/png");
				const pdf = new JsPDF({
					orientation: "p",
					unit: "px",
					format: [3508, 1080],
				});
				pdf.addImage(imgData, "png", 10, 10, 0, 0);
				// pdf.output("dataurlnewwindow");
				pdf.save("download.pdf");
			} catch (error) {
				console.log(error);
			}
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
			<div id="cv" className={componentClass}>
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
};

export default CvModelOne;
