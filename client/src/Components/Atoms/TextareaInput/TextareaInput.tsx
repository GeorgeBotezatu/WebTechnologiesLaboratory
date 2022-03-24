import "./TextareaInput.scss";
import React from "react";
import { useField } from "formik";
interface ITextarea {
	id: string;
	placeholder: string;
	name: string;
}

const TextareaInput: React.FC<ITextarea> = ({ id, placeholder, ...props }) => {
	const componentClass = "wtl-textarea-input";
	const textareaClass = `${componentClass}--textarea`;
	/* eslint-disable @typescript-eslint/no-unused-vars */
	const [field, meta] = useField(props);
	return (
		<div className={componentClass}>
			<textarea
				className={textareaClass}
				placeholder={placeholder}
				id={id}
				{...field}
			></textarea>
		</div>
	);
};

export default TextareaInput;
