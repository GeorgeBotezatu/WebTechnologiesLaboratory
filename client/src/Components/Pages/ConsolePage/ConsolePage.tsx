import "./ConsolePage.scss";
import React, { useEffect, useRef, useState } from "react";
import CodeEditor from "../../Moleculs/Console/CodeEditor/CodeEditor";
import CodePreview from "../../Moleculs/Console/CodePreview/CodePreview";
import classNames from "classnames";
import prettier from "prettier";
import parserJs from "prettier/parser-babel";
import parserCss from "prettier/parser-postcss";
import parserHtml from "prettier/parser-html";

import { CSS, HTML, JAVASCRIPT } from "../../../Utils/constants";
import DropDownMenu from "../../Atoms/DropDownMenu/DropDownMenu";
import EditableTextField from "../../Atoms/EditableTextField/EditableTextField";
import { useLocation, useParams } from "react-router";

const ConsolePage = () => {
	const { id } = useParams();
	const { state } = useLocation();
	const [html, setHtml] = useState(id && state.html ? state.html : "");
	const [css, setCss] = useState(id && state.css ? state.css : "");
	const [js, setJs] = useState(id && state.js ? state.js : "");
	const [consoleName, setName] = useState(
		id && state.name ? state.name : "Undefined"
	);
	const [srcDoc, setSrcDoc] = useState("");
	const [open, setOpen] = useState("html");
	const [colorMode, setColorMode] = useState(true);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setSrcDoc(`
<html>
<body>${html}
</body>
<style>${css}</style>
<script>
const handleError=err=>{
			const root=document.querySelector('#root');
			root.innerHTML='<div style="color:red" ><h4>Runtime Error</h4> '+err+'</div>';
			console.error(err);
	}

	//handle async errors(ex from timeout)
	window.addEventListener("error",(event)=>{
		event.preventDefault();
		handleError(event.error);
	})

	window.addEventListener("message",(event)=>{
		try{
			eval(event.data);
		}catch(err){
			handleError(err)
		}
	},false)	

${js && js}</script>
<html>
`);
		}, 250);

		return () => {
			clearTimeout(timeout);
		};
	}, [html, css, js]);

	const formatOnClick = () => {
		try {
			//format html code
			const formattedHtml = prettier
				.format(html, {
					parser: "html",
					plugins: [parserHtml],
					useTabs: false,
					semi: true,
					singleQuote: true,
				})
				.replace(/\n$/, "");
			setHtml(formattedHtml);
			//format css code
			const formattedCss = prettier
				.format(css, {
					parser: "css",
					plugins: [parserCss],
					useTabs: false,
					semi: true,
					singleQuote: true,
				})
				.replace(/\n$/, "");
			setCss(formattedCss);
			//format js code
			const formattedJs = prettier
				.format(js, {
					parser: "babel",
					plugins: [parserJs],
					useTabs: false,
					semi: true,
					singleQuote: true,
				})
				.replace(/\n$/, "");
			setJs(formattedJs);
		} catch (error: any) {
			console.log(error);
		}
	};

	useEffect(() => {
		formatOnClick();
	}, [id, state]); // eslint-disable-line react-hooks/exhaustive-deps
	console.log(js);
	const inputRef =
		useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>;
	const componentClass = "wtl-console-page";
	const consolePageContainerClass = `${componentClass}__container`;
	const codePreviewContainerClass = `${consolePageContainerClass}__preview-container`;
	const previewClass = `${codePreviewContainerClass}--preview`;
	const actionButtonClass = `${codePreviewContainerClass}--action-button`;
	const codeEditorContainerClass = `${consolePageContainerClass}__code-editors-container`;
	const codeEditorNavClass = `${codeEditorContainerClass}__nav`;
	const editorsClass = `${codeEditorContainerClass}__editors`;
	const editorClass = `${editorsClass}--editor`;
	const formatButtonClass = `${codeEditorContainerClass}--format-button`;
	return (
		<div className={consolePageContainerClass}>
			<div className={codeEditorContainerClass}>
				<button
					type="button"
					onClick={() => {
						formatOnClick();
					}}
					className={formatButtonClass}
				>
					FormatCode
				</button>
				<EditableTextField
					text={consoleName}
					placeholder="Console Name"
					type="input"
					childRef={inputRef}
					updateFunction={setName}
				>
					<input
						ref={inputRef}
						type="text"
						name="ConsoleName"
						placeholder="Console Name"
						value={consoleName}
						onChange={(e) => setName(e.target.value)}
					/>
				</EditableTextField>
				<div className={codeEditorNavClass}>
					<button
						type="button"
						onClick={() => {
							setOpen(HTML);
						}}
						className={open === HTML ? "active" : ""}
					>
						HTML
					</button>
					<button
						type="button"
						onClick={() => {
							setOpen(CSS);
						}}
						className={open === CSS ? "active" : ""}
					>
						CSS
					</button>
					<button
						type="button"
						onClick={() => {
							setOpen(JAVASCRIPT);
						}}
						className={open === JAVASCRIPT ? "active" : ""}
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
							colorMode={colorMode}
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
							colorMode={colorMode}
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
							colorMode={colorMode}
						/>
					</div>
				</div>
			</div>
			<div className={codePreviewContainerClass}>
				<div className={actionButtonClass}>
					<DropDownMenu
						consoleName={consoleName}
						js={js}
						html={html}
						css={css}
						currentColor={colorMode}
						onChange={setColorMode}
						id={state?.id}
					/>
				</div>
				<div className={previewClass}>
					<CodePreview srcDoc={srcDoc} />
				</div>
			</div>
		</div>
	);
};

export default ConsolePage;
