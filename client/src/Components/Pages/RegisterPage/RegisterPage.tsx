import "./RegisterPage.scss";
import React from "react";
import RegisterForm from "../../Moleculs/AuthenticationForms/RegisterForm/RegisterForm";

const RegisterPage: React.FC = () => {
	const componentClass = "wtl-register-page";
	return (
		<section className={componentClass}>
			<RegisterForm />
		</section>
	);
};

export default RegisterPage;
