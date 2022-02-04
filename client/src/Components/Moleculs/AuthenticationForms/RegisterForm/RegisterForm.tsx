import "./RegisterForm.scss";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	clearAuthenticationError,
	registerFail,
	registerInit,
	registerSuccess,
} from "../../../../Store/features/registerSlice";
import { userRegister } from "../../../../API/authApi";
import TextInput from "../../../Atoms/TextInput/TextInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import {
	COULD_NOT_LOAD_PROFILE,
	COULD_NOT_REGISTER,
	YUP_EMPTY_EMAIL,
	YUP_EMPTY_PASSWORD,
	YUP_EMPTY_RE_PASSWORD,
	YUP_EMPTY_USERNAME,
	YUP_MATCH_RE_PASSWORD,
	YUP_VALID_EMAIL,
	YUP_VALID_PASSWORD,
} from "../../../../Utils/constants";
import { getRandomNumber } from "../../../../Utils/utilFunctions";
import { randomFactsArr } from "../../../../Utils/randomFacts";
import { LOGIN_PATH } from "../../../../Routes/routesPath";
import { RootState } from "../../../../Store/Store";
import { createProfile, loadProfile } from "../../../../API/profileAPI";
import {
	profileLoadFail,
	profileLoadInit,
	profileLoadSuccess,
} from "../../../../Store/features/profileSlice";
import { IUserState } from "../../../../Interfaces";
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
	const { isAuthenticated, error } = useSelector(
		(state: RootState) => state.auth
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [emailLabel, setEmailLabel] = useState<string>("Email");
	useEffect(() => {
		if (error) {
			setEmailLabel("Email already used");
			dispatch(clearAuthenticationError());
		}
	}, [error, dispatch]);

	const randomNumber: number = getRandomNumber(0, randomFactsArr.length - 1);
	const initialValues: FormValues = {
		username: "",
		email: "",
		password: "",
		rePassword: "",
	};

	useEffect(() => {
		if (isAuthenticated) navigate("/");
	}, [isAuthenticated, navigate]);

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
		dispatch(profileLoadInit());
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
			await createProfile(registerResponse.token);

			const profileLoadResponse = (await loadProfile(
				registerResponse.token
			)) as IUserState;
			if (!profileLoadResponse) {
				dispatch(profileLoadFail(COULD_NOT_LOAD_PROFILE));
			}

			dispatch(registerSuccess());
			dispatch(profileLoadSuccess(profileLoadResponse));
			navigate("/");
		} catch (error: any) {
			dispatch(registerFail(error.message));
			dispatch(profileLoadFail(error.message));
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
	const titleRandomClass = `${textSideClass}--random-title`;
	const randomFactClass = `${textSideClass}--random-fact`;
	const rectangleOneClass = `${textSideClass}--rectangle-one`;
	const rectangleTwoClass = `${textSideClass}--rectangle-two`;

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
								type="text"
								id="username"
								name="username"
								placeholder="Username"
								labelText="Username"
							/>
							<TextInput
								type="email"
								id="email"
								name="email"
								placeholder="Email"
								labelText={emailLabel}
							/>

							<TextInput
								type="password"
								id="password"
								name="password"
								placeholder="Password"
								labelText="Password"
							/>

							<TextInput
								type="password"
								id="rePassword"
								name="rePassword"
								placeholder="Re-Passsword"
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
							Random fact about{" "}
							<span className={`${titleRandomClass}--special`}>web :</span>
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
