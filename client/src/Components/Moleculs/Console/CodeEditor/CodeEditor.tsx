import "./CodeEditor.scss";
import React from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/theme/eclipse.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/javascript-hint";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/keymap/sublime";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/comment-fold";
import "codemirror/addon/fold/foldgutter.css";
//am auto close tag si paranteza , formatare code, ctrl+ space optiuni de autocomplete
import { Controlled as ControlledEditor } from "react-codemirror2";

interface ICodeEditor {
	displayName: string;
	language: string;
	onChange(value: string): void;
	value: string;
	colorMode: boolean;
}
//.CodeMirror-scroll{
// position:absolute
//}
const CodeEditor: React.FC<ICodeEditor> = ({
	displayName,
	language,
	onChange,
	value,
	colorMode,
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
				className="wtl-code-editor"
				options={{
					lineWrapping: true,
					smartIndent: true,
					foldGutter: true,
					mode: language,
					theme: colorMode ? "material" : "eclipse",
					lineNumbers: true,
					gutters: [
						"CodeMirror-lint-markers",
						"CodeMirror-linenumbers",
						"CodeMirror-foldgutter",
					],
					autoCloseTags: true,
					keyMap: "sublime",
					autoCloseBrackets: true,
					extraKeys: {
						"Ctrl-Space": "autocomplete",
					},
				}}
			/>
		</>
	);
};

export default CodeEditor;
