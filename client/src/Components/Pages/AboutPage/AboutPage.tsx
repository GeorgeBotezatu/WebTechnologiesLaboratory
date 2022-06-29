import "./AboutPage.scss";
import React from "react";

const AboutPage = () => {
	const componentClass = "wtl-about-page__container";
	const imageClass = `${componentClass}--image`;
	const contentContainerClass = `${componentClass}__content`;
	return (
		<div className={componentClass}>
			<div className={imageClass}></div>
			<div className={contentContainerClass}>
				<h1>About Me (The Developer)</h1>
				<p>
					My name is George, I have 22 years old and I am student in my final
					year and this is my bachelor project.
				</p>
			</div>
			<div className={contentContainerClass}>
				<h1>Our Mission</h1>
				<p>
					I have developed this type of web platform because in my learning and
					specialization I have not found a platform that meets all my
					requirements in one place by default I needed several accounts to
					create on different platforms for different issues such as: learning,
					writing code and saving it, for posting problems in order to find
					help. l
				</p>
				<p>
					With this work I aim to solve all the requirements listed above in one
					place, but also provide a pleasant user experience by creating an
					intuitive and easy to use interface.
				</p>
			</div>
			<div className={contentContainerClass}>
				<h1>Rules our community</h1>
				<ul>
					<li>No Spam / Advertising / Self-promote in the forums</li>
					<li>Do not post “offensive” posts, links or images</li>
					<li>Do not cross post questions</li>
					<li> Remain respectful of other members at all times</li>
					<li>Be DESCRIPTIVE and Don`t use “stupid” topic names</li>
				</ul>
			</div>
		</div>
	);
};

export default AboutPage;
