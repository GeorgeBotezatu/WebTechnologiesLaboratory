import "./RegisterForm.scss";
import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import {
	registerFail,
	registerInit,
	registerSuccess,
} from "../../../Store/features/registerSlice";
import { userRegister } from "../../../API/authApi";

interface IRegisterResponse {
	token: string;
}

const RegisterForm: React.FC = () => {
	const dispatch = useDispatch();

	const submitHandler = async (e: any) => {
		e.preventDefault();

		dispatch(registerInit());
		try {
			const registerResponse = (await userRegister({
				email: "george.botezatu3213123231252321@yahoo.com",
				name: "el",
				password: "12342567",
			})) as IRegisterResponse;
			if (!registerResponse.token) {
				dispatch(registerFail("Could not register"));
			}
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
		<div className={componentClass}>
			<div className={formSideClass}>
				<p className={headerClass}>
					Welcome to <span className={`${headerClass}--special`}>wtl. </span>
					Complete a few steps to join our community!
				</p>
				<form className={formClass} onSubmit={(e) => submitHandler(e)}>
					<div className={inputContainerClass}>
						<input
							className={classNames(inputClass, extraInput)}
							type="text"
							id="username"
							placeholder="Username"
						/>
						<label
							className={classNames(labelClass, extraLabel)}
							htmlFor="username"
						>
							Username
						</label>
					</div>
					<div className={inputContainerClass}>
						<input
							className={classNames(inputClass, extraInput)}
							type="email"
							id="email"
							placeholder="Email"
						/>
						<label
							className={classNames(labelClass, extraLabel)}
							htmlFor="Email"
						>
							Email
						</label>
					</div>
					<div className={inputContainerClass}>
						<input
							className={classNames(inputClass, extraInput)}
							type="password"
							id="password"
							placeholder="Password"
						/>
						<label
							className={classNames(labelClass, extraLabel)}
							htmlFor="password"
						>
							Password
						</label>
					</div>
					<div className={inputContainerClass}>
						<input
							className={classNames(inputClass, extraInput)}
							type="password"
							id="confirm_password"
							placeholder="Re-Passsword"
						/>
						<label
							className={classNames(labelClass, extraLabel)}
							htmlFor="confirm_password"
						>
							Confirm Password
						</label>
					</div>
					<button className={submitButtonClass} type="submit">
						Submit
					</button>
					<p className={extraMessageClass}>
						<span>*</span>This site uses Gravatar so if you want a profile
						image, use a Gravatar email !
					</p>
					<p className={redirectMessageClass}>
						Already Learner?{" "}
						<Link to="login" className={linkRedirectClass}>
							Click Me
						</Link>
					</p>
				</form>
			</div>
			<div className={textSideClass}>
				<p className={titleRandomClass}>
					Random fact about web{" "}
					<span className={`${titleRandomClass}--special`}>design :</span>
				</p>

				<p className={randomFactClass}>
					<span className={`${randomFactClass}--first-quote`}>"</span>
					86% of visitors want info about prosucts/service on the hompage
					<span className={`${randomFactClass}--last-quote`}>"</span>
				</p>
				<div className={rectangleOneClass}></div>
				<div className={rectangleTwoClass}></div>
			</div>
		</div>
	);
};

export default RegisterForm;
