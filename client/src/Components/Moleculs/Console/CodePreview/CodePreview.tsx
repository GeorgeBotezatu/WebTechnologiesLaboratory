import "./CodePreview.scss";
import React, { useEffect } from "react";

interface ICodePreview {
	srcDoc: string;
}

const CodePreview: React.FC<ICodePreview> = ({ srcDoc }) => {
	return (
		<>
			<iframe
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
