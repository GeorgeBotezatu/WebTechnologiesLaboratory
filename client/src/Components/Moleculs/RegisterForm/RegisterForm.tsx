import "./RegisterForm.scss";
import React, { useEffect } from "react";
import classNames from "classnames";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
	registerFail,
	registerInit,
	registerSuccess,
} from "../../../Store/features/registerSlice";
import { userRegister } from "../../../API/authApi";
import TextInput from "../../Atoms/TextInput/TextInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import {
	COULD_NOT_REGISTER,
	YUP_EMPTY_EMAIL,
	YUP_EMPTY_PASSWORD,
	YUP_EMPTY_RE_PASSWORD,
	YUP_EMPTY_USERNAME,
	YUP_MATCH_RE_PASSWORD,
	YUP_VALID_EMAIL,
	YUP_VALID_PASSWORD,
} from "../../../Utils/constants";
import { getRandomNumber } from "../../../Utils/utilFunctions";
import { randomFactsArr } from "../../../Utils/randomFacts";
import { LOGIN_PATH } from "../../../Routes/routesPath";
import { RootState } from "../../../Store/Store";
interface IRegisterResponse {
	token: string;
}
interface FormValues {
	username: string;
	email: string;
	password: string;
	rePassword: string;
}

const RegisterForm: React.FC = () => {
	const { isAuthenticated } = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const randomNumber: number = getRandomNumber(0, randomFactsArr.length - 1);
	const initialValues: FormValues = {
		username: "",
		email: "",
		password: "",
		rePassword: "",
	};

	useEffect(() => {
		if (isAuthenticated) navigate("/");
	}, [isAuthenticated]);

	const validate = Yup.object({
		username: Yup.string().required(YUP_EMPTY_USERNAME),
		email: Yup.string().email(YUP_VALID_EMAIL).required(YUP_EMPTY_EMAIL),
		password: Yup.string()
			.required(YUP_EMPTY_PASSWORD)
			.matches(
				/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
				YUP_VALID_PASSWORD
			),
		rePassword: Yup.string()
			.oneOf([Yup.ref("password"), null], YUP_MATCH_RE_PASSWORD)
			.required(YUP_EMPTY_RE_PASSWORD),
	});

	const submitHandler = async (values: FormValues) => {
		dispatch(registerInit());
		try {
			const registerValues = {
				email: values.email,
				name: values.username,
				password: values.password,
			};
			const registerResponse = (await userRegister(
				registerValues
			)) as IRegisterResponse;
			if (!registerResponse.token) {
				dispatch(registerFail(COULD_NOT_REGISTER));
			}
			navigate("/");
			dispatch(registerSuccess());
		} catch (error: any) {
			dispatch(registerFail(error.message));
		}
	};

	const componentClass = "wtl-register-form";
	const formSideClass = `${componentClass}__form-side`;
	const textSideClass = `${componentClass}__text-side`;
	const headerClass = `${formSideClass}--header`;
	const formClass = `${formSideClass}__form`;
	const extraMessageClass = `${formClass}--extra`;
	const redirectMessageClass = `${formClass}__redirect`;
	const linkRedirectClass = `${redirectMessageClass}--link`;
	const submitButtonClass = `${formClass}--submit`;
	const inputContainerClass = `${formClass}__input-container`;
	const inputClass = `${inputContainerClass}--input`;
	const labelClass = `${inputContainerClass}--label`;
	const titleRandomClass = `${textSideClass}--random-title`;
	const randomFactClass = `${textSideClass}--random-fact`;
	const rectangleOneClass = `${textSideClass}--rectangle-one`;
	const rectangleTwoClass = `${textSideClass}--rectangle-two`;
	const extraInput = "form__field";
	const extraLabel = "form__label";
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validate}
			onSubmit={(values) => {
				submitHandler(values);
			}}
		>
			{(formik) => (
				<div className={componentClass}>
					<div className={formSideClass}>
						<p className={headerClass}>
							Welcome to{" "}
							<span className={`${headerClass}--special`}>wtl. </span>
							Complete a few steps to join our community!
						</p>
						<Form className={formClass}>
							<TextInput
								inputContainerClass={inputContainerClass}
								inputClass={classNames(inputClass, extraInput)}
								type="text"
								id="username"
								name="username"
								placeholder="Username"
								labelClass={classNames(labelClass, extraLabel)}
								labelText="Username"
							/>
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

							<TextInput
								inputContainerClass={inputContainerClass}
								inputClass={classNames(inputClass, extraInput)}
								type="password"
								id="rePassword"
								name="rePassword"
								placeholder="Re-Passsword"
								labelClass={classNames(labelClass, extraLabel)}
								labelText="Re-Password"
							/>

							<button className={submitButtonClass} type="submit">
								Submit
							</button>
							<p className={extraMessageClass}>
								<span>*</span>This site uses Gravatar so if you want a profile
								image, use a Gravatar email !
							</p>
							<p className={redirectMessageClass}>
								Already Learner?{" "}
								<Link to={LOGIN_PATH} className={linkRedirectClass}>
									Click Me!
								</Link>
							</p>
						</Form>
					</div>
					<div className={textSideClass}>
						<p className={titleRandomClass}>
							Random fact about web{" "}
							<span className={`${titleRandomClass}--special`}>design :</span>
						</p>

						<p className={randomFactClass}>{randomFactsArr[randomNumber]}</p>
						<div className={rectangleOneClass}></div>
						<div className={rectangleTwoClass}></div>
					</div>
				</div>
			)}
		</Formik>
	);
};

export default RegisterForm;
