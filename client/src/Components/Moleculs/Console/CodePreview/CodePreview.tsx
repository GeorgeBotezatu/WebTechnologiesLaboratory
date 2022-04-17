import "./CodePreview.scss";
import React from "react";

interface ICodePreview {
	srcDoc: string;
}

const CodePreview: React.FC<ICodePreview> = ({ srcDoc }) => {
	const componentClass = "wtl-code-preview";

	return (
		<>
			<iframe
				className={componentClass}
				srcDoc={srcDoc}
				title="output"
				sandbox="allow-scripts"
				// frameBorder="0"
				width="100%"
				height="100%"
			/>
		</>
	);
};

export default CodePreview;
