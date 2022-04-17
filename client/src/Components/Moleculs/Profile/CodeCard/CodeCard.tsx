import "./CodeCard.scss";
import React, { useEffect } from "react";
import CodeItem from "../CodeItem/CodeItem";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Store/Store";

const CodeCard: React.FC = () => {
	const { codeSaves } = useSelector(
		(state: RootState) => state.userProfile.userProfile
	);
	useEffect(() => {}, [codeSaves]);

	const classComponent = "wtl-code-saves-section";
	const titleClass = `${classComponent}--title`;
	const codeContainerClass = `${classComponent}__code-container`;
	return (
		<div id="code-card" className={classComponent}>
			<h2 className={titleClass}>Code Saves</h2>
			<div className={codeContainerClass}>
				{codeSaves &&
					codeSaves.map((item, index) => {
						return (
							<CodeItem
								key={index}
								name={item.name}
								js={item.js}
								css={item.css}
								html={item.html}
								id={item._id}
							/>
						);
					})}
			</div>
		</div>
	);
};

export default CodeCard;
