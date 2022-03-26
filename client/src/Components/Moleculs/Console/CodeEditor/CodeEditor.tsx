import "./CodeEditor.scss";
import React from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import { Controlled as ControlledEditor } from "react-codemirror2";

interface ICodeEditor {
	displayName: string;
	language: string;
	onChange(value: string): void;
	value: string;
}
//.CodeMirror-scroll{
// position:absolute
//}
const CodeEditor: React.FC<ICodeEditor> = ({
	displayName,
	language,
	onChange,
	value,
}) => {
	const handleChange = (
		editor: CodeMirror.Editor,
		data: any,
		value: string
	) => {
		onChange(value);
	};
	return (
		<>
			<ControlledEditor
				onBeforeChange={handleChange}
				value={value}
				className="code-mirror-wrapper"
				options={{
					lineWrapping: true,
					// lint: true,
					mode: language,
					theme: "material",
					lineNumbers: true,
				}}
			/>
		</>
	);
};

export default CodeEditor;
