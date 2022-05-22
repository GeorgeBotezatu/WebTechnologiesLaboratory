import "./LoginForm.scss";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
	CAN_NOT_LOAD_COURSES_LIST,
	COULD_NOT_LOAD_PROFILE,
	COULD_NOT_LOGIN,
	YUP_EMPTY_EMAIL,
	YUP_EMPTY_PASSWORD,
	YUP_VALID_EMAIL,
} from "../../../../Utils/constants";
import LoginBadge from "../../../../Assets/Images/LoginBadge.svg";
import TextInput from "../../../Atoms/TextInput/TextInput";
import { REGISTER_PATH } from "../../../../Routes/routesPath";
import { useDispatch, useSelector } from "react-redux";
import {
	loginFail,
	loginInit,
	loginSuccess,
} from "../../../../Store/features/registerSlice";
import { userLogin } from "../../../../API/loginAuth";
import { RootState } from "../../../../Store/Store";
import { loadProfile } from "../../../../API/profileAPI";
import { createAdminCookie, getToken } from "../../../../Utils/utilFunctions";
import { ICoursesList, IUserState } from "../../../../Interfaces";
import {
	profileLoadFail,
	profileLoadInit,
	profileLoadSuccess,
} from "../../../../Store/features/profileSlice";
import { getCoursesList } from "../../../../API/coursesAPI";
import {
	coursesListLoadFail,
	coursesListLoadInit,
	coursesListLoadSuccess,
} from "../../../../Store/features/coursesSlice";
interface FormValues {
	email: string;
	password: string;
}
interface ILoginResponse {
	token: string;
}

const LoginForm: React.FC = () => {
	const { isAuthenticated, error } = useSelector(
		(state: RootState) => state.auth
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const initialValues: FormValues = {
		email: "",
		password: "",
	};

	useEffect(() => {
		if (isAuthenticated) navigate("/");
	}, [isAuthenticated, navigate]);

	const validate = Yup.object({
		email: Yup.string().email(YUP_VALID_EMAIL).required(YUP_EMPTY_EMAIL),
		password: Yup.string().required(YUP_EMPTY_PASSWORD),
	});

	const submitHandler = async (values: FormValues) => {
		dispatch(loginInit());
		dispatch(profileLoadInit());
		dispatch(coursesListLoadInit());
		try {
			const loginValues = {
				email: values.email,
				password: values.password,
			};

			const loginResponse = (await userLogin(loginValues)) as ILoginResponse;
			if (!loginResponse.token) {
				dispatch(loginFail(COULD_NOT_LOGIN));
			}

			const profileLoadResponse = (await loadProfile(getToken())) as IUserState;
			if (!profileLoadResponse) {
				dispatch(profileLoadFail(COULD_NOT_LOAD_PROFILE));
			}

			createAdminCookie(profileLoadResponse.user.isAdmin);
			dispatch(loginSuccess(profileLoadResponse.user.isAdmin));
			dispatch(profileLoadSuccess(profileLoadResponse));

			const coursesList = (await getCoursesList(getToken())) as ICoursesList;
			if (!coursesList) {
				dispatch(coursesListLoadFail(CAN_NOT_LOAD_COURSES_LIST));
			}
			dispatch(coursesListLoadSuccess(coursesList));

			navigate("/");
		} catch (error: any) {
			dispatch(loginFail(error.message));
			dispatch(profileLoadFail(error.message));
		}
	};

	const componentClass = "wtl-login-form";
	const formSideClass = `${componentClass}__form-side`;
	const textSideClass = `${componentClass}__text-side`;
	const headerClass = `${formSideClass}--header`;
	const formClass = `${formSideClass}__form`;
	const redirectMessageClass = `${formClass}__redirect`;
	const linkRedirectClass = `${redirectMessageClass}--link`;
	const submitButtonClass = `${formClass}--submit`;
	const invalidCredentialsClass = `${formClass}--invalid`;
	const titleRandomClass = `${textSideClass}--random-title`;
	const rectangleOneClass = `${textSideClass}--rectangle-one`;
	const rectangleTwoClass = `${textSideClass}--rectangle-two`;
	const badgeClass = `${textSideClass}--badge`;

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
							Welcome back to{" "}
							<span className={`${headerClass}--special`}>wtl </span>Lerner!
							Ready to learn new stuff?
						</p>
						<Form className={formClass}>
							<TextInput
								type="email"
								id="email"
								name="email"
								placeholder="Email"
								labelText="Email"
							/>

							<TextInput
								type="password"
								id="password"
								name="password"
								placeholder="Password"
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
							{error && (
								<p className={invalidCredentialsClass}>Incorect Credentials!</p>
							)}
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
