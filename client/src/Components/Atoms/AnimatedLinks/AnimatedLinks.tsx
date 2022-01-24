import "./AnimatedLinks.scss";
import React from "react";
import { Link } from "react-router-dom";

interface IAnimatedLink {
	link: string;
	text: string;
}

const AnimatedLinks: React.FC<IAnimatedLink> = ({ link, text }) => {
	const componentClass = "wtl-animated-links-component";
	return (
		<>
			{link.startsWith("#") ? (
				<a href={link} className={componentClass}>
					<span>{text}</span>
					<svg viewBox="0 0 13 20">
						<polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
					</svg>
				</a>
			) : (
				<Link to={link} className={componentClass}>
					<span>{text}</span>
					<svg viewBox="0 0 13 20">
						<polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
					</svg>
				</Link>
			)}
		</>
	);
};
export default AnimatedLinks;
