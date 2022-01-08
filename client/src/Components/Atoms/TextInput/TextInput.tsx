import "./TextInput.scss";
import React from "react";
import { ErrorMessage, useField } from "formik";
import classNames from "classnames";
interface ITextInput {
	type: string;
	id: string;
	placeholder: string;
	labelText: string;
	name: string;
}

const TextInput: React.FC<ITextInput> = ({
	placeholder,
	labelText,
	id,
	...props
}) => {
	const [field, meta] = useField(props);
	const inputContainerClass = "wtl-text-input";
	const inputClass = `${inputContainerClass}--input`;
	const labelClass = `${inputContainerClass}--label`;
	const extraInput = "form__field";
	const extraLabel = "form__label";
	const extraInputError = `${extraInput}-error`;
	const extraLabelError = `${extraLabel}-error`;
	const errorTextInputClass = "errorTextInput";
	return (
		<div className={inputContainerClass}>
			<input
				className={
					!meta.error || !meta.touched
						? classNames(inputClass, extraInput)
						: classNames(
								inputClass,
								extraInput,
								extraInputError,
								errorTextInputClass
						  )
				}
				type={props.type}
				id={id}
				placeholder={placeholder}
				{...field}
				autoComplete="false"
			/>
			<label
				className={
					!meta.error || !meta.touched
						? classNames(labelClass, extraLabel)
						: classNames(labelClass, extraLabel, extraLabelError)
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
