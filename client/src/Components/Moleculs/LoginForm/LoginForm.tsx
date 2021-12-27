import "./LoginForm.scss";
import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
	YUP_EMPTY_EMAIL,
	YUP_EMPTY_PASSWORD,
	YUP_VALID_EMAIL,
} from "../../../Utils/constants";
import LoginBadge from "../../../Assets/Images/LoginBadge.svg";
import classNames from "classnames";
import TextInput from "../../Atoms/TextInput/TextInput";
import { REGISTER_PATH } from "../../../Routes/routesPath";
interface FormValues {
	email: string;
	password: string;
}

const LoginForm: React.FC = () => {
	const initialValues: FormValues = {
		email: "",
		password: "",
	};
	const validate = Yup.object({
		email: Yup.string().email(YUP_VALID_EMAIL).required(YUP_EMPTY_EMAIL),
		password: Yup.string().required(YUP_EMPTY_PASSWORD),
	});

	const componentClass = "wtl-login-form";
	const formSideClass = `${componentClass}__form-side`;
	const textSideClass = `${componentClass}__text-side`;
	const headerClass = `${formSideClass}--header`;
	const formClass = `${formSideClass}__form`;
	const redirectMessageClass = `${formClass}__redirect`;
	const linkRedirectClass = `${redirectMessageClass}--link`;
	const submitButtonClass = `${formClass}--submit`;
	const inputContainerClass = `${formClass}__input-container`;
	const inputClass = `${inputContainerClass}--input`;
	const labelClass = `${inputContainerClass}--label`;
	const titleRandomClass = `${textSideClass}--random-title`;
	const rectangleOneClass = `${textSideClass}--rectangle-one`;
	const rectangleTwoClass = `${textSideClass}--rectangle-two`;
	const badgeClass = `${textSideClass}--badge`;
	const extraInput = "form__field";
	const extraLabel = "form__label";

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validate}
			onSubmit={() => {
				console.log("not yet");
			}}
		>
			{(formik) => (
				<div className={componentClass}>
					<div className={formSideClass}>
						<p className={headerClass}>
							Welcome back to{" "}
							<span className={`${headerClass}--special`}>wtl </span>Lerner!
							Ready to learn new stuff?
						</p>
						<Form className={formClass}>
							<TextInput
								inputContainerClass={inputContainerClass}
								inputClass={classNames(inputClass, extraInput)}
								type="email"
								id="email"
								name="email"
								placeholder="Email"
								labelClass={classNames(labelClass, extraLabel)}
								labelText="Email"
							/>

							<TextInput
								inputContainerClass={inputContainerClass}
								inputClass={classNames(inputClass, extraInput)}
								type="password"
								id="password"
								name="password"
								placeholder="Password"
								labelClass={classNames(labelClass, extraLabel)}
								labelText="Password"
							/>

							<button className={submitButtonClass} type="submit">
								Submit
							</button>

							<p className={redirectMessageClass}>
								Not yet Lerner?{" "}
								<Link to={REGISTER_PATH} className={linkRedirectClass}>
									Click Me!
								</Link>
							</p>
						</Form>
					</div>
					<div className={textSideClass}>
						<p className={titleRandomClass}>
							Get throught the{" "}
							<span className={`${titleRandomClass}--special`}>
								learning path{" "}
							</span>
							to get your badges!
						</p>
						<img className={badgeClass} src={LoginBadge} alt="login-badge" />
						<div className={rectangleOneClass}></div>
						<div className={rectangleTwoClass}></div>
					</div>
				</div>
			)}
		</Formik>
	);
};

export default LoginForm;
