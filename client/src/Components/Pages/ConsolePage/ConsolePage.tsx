import "./ConsolePage.scss";
import React, { useEffect, useState } from "react";
import CodeEditor from "../../Moleculs/Console/CodeEditor/CodeEditor";
import CodePreview from "../../Moleculs/Console/CodePreview/CodePreview";
import classNames from "classnames";
import { CSS, HTML, JAVASCRIPT } from "../../../Utils/constants";

const ConsolePage = () => {
	const [html, setHtml] = useState("");
	const [css, setCss] = useState("");
	const [js, setJs] = useState("");
	const [srcDoc, setSrcDoc] = useState("");
	const [open, setOpen] = useState("html");

	useEffect(() => {
		const timeout = setTimeout(() => {
			setSrcDoc(`
  <html>
  <body>${html}</body>
  <style>${css}</style>
  <script>${js}</script>
  <html>
  `);
		}, 250);

		return () => clearTimeout(timeout);
	}, [html, css, js]);

	//.CodeMirror -to overwrite editor
	const componentClass = "wtl-console-page";
	const consolePageContainerClass = `${componentClass}__container`;
	const codePreviewContainerClass = `${consolePageContainerClass}__preview-container`;
	const previewClass = `${codePreviewContainerClass}--preview`;
	const actionButtonClass = `${codePreviewContainerClass}--action-button`;
	const codeEditorContainerClass = `${consolePageContainerClass}__code-editors-container`;
	const codeEditorNavClass = `${codeEditorContainerClass}__nav`;
	const editorsClass = `${codeEditorContainerClass}__editors`;
	const editorClass = `${editorsClass}--editor`;
	return (
		<div className={consolePageContainerClass}>
			<div className={codeEditorContainerClass}>
				<div className={codeEditorNavClass}>
					<button
						type="button"
						onClick={() => {
							setOpen(HTML);
						}}
					>
						HTML
					</button>
					<button
						type="button"
						onClick={() => {
							setOpen(CSS);
						}}
					>
						CSS
					</button>
					<button
						type="button"
						onClick={() => {
							setOpen(JAVASCRIPT);
						}}
					>
						JS
					</button>
				</div>
				<div className={editorsClass}>
					<div
						className={
							open === HTML ? classNames(editorClass, "active") : editorClass
						}
					>
						<CodeEditor
							displayName="HTML"
							language="xml"
							value={html}
							onChange={setHtml}
						/>
					</div>
					<div
						className={
							open === CSS ? classNames(editorClass, "active") : editorClass
						}
					>
						<CodeEditor
							displayName="CSS"
							language="css"
							value={css}
							onChange={setCss}
						/>
					</div>
					<div
						className={
							open === JAVASCRIPT
								? classNames(editorClass, "active")
								: editorClass
						}
					>
						<CodeEditor
							displayName="JS"
							language="javascript"
							value={js}
							onChange={setJs}
						/>
					</div>
				</div>
			</div>
			<div className={codePreviewContainerClass}>
				<div className={actionButtonClass}>
					<button type="button">ActionButton</button>
				</div>
				<div className={previewClass}>
					<CodePreview srcDoc={srcDoc} />
				</div>
			</div>
		</div>
	);
};

export default ConsolePage;
