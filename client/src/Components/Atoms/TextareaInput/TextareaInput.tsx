import "./TextareaInput.scss";
import React from "react";
import { useField } from "formik";

interface ITextarea {
	id: string;
	placeholder: string;
	name: string;
	withVerification: boolean;
	validationMsg?: string;
}

const TextareaInput: React.FC<ITextarea> = ({
	id,
	placeholder,
	withVerification,
	...props
}) => {
	const componentClass = "wtl-textarea-input";
	const textareaClass = `${componentClass}--textarea`;
	/* eslint-disable @typescript-eslint/no-unused-vars */
	const [field, meta] = useField(props);
	return (
		<div className={componentClass}>
			<textarea
				className={textareaClass}
				placeholder={
					!withVerification
						? placeholder
						: !meta.error || !meta.touched
						? placeholder
						: props.validationMsg
				}
				id={id}
				{...field}
			></textarea>
		</div>
	);
};

export default TextareaInput;
