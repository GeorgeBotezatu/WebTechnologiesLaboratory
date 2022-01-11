import "./TextareaInput.scss";
import React from "react";
import { useField } from "formik";
interface ITextarea {
	id: string;
	placeholder: string;
	name: string;
	textareaClass: string;
}

const TextareaInput: React.FC<ITextarea> = ({
	id,
	placeholder,
	textareaClass,
	...props
}) => {
	/* eslint-disable @typescript-eslint/no-unused-vars */
	const [field, meta] = useField(props);
	return (
		<div>
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
