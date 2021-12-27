import React from "react";
import { ErrorMessage, useField } from "formik";
import "./TextInput.scss";
interface ITextInput {
	inputContainerClass: string;
	inputClass: string;
	type: string;
	id: string;
	placeholder: string;
	labelClass: string;
	labelText: string;
	name: string;
}

const TextInput: React.FC<ITextInput> = ({
	inputContainerClass,
	inputClass,
	placeholder,
	labelClass,
	labelText,
	id,
	...props
}) => {
	const [field, meta] = useField(props);

	return (
		<div className={inputContainerClass}>
			<input
				className={
					!meta.error || !meta.touched
						? inputClass
						: `${inputClass}-error errorTextInput`
				}
				type={props.type}
				id={id}
				placeholder={placeholder}
				{...field}
				autoComplete="false"
			/>
			<label
				className={
					!meta.error || !meta.touched ? labelClass : `${labelClass}-error`
				}
				htmlFor={id}
			>
				{!meta.error || !meta.touched ? (
					labelText
				) : (
					<ErrorMessage name={props.name} />
				)}
			</label>
		</div>
	);
};
export default TextInput;
