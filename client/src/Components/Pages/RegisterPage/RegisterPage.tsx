import "./RegisterPage.scss";
import React from "react";
import RegisterForm from "../../Moleculs/RegisterForm/RegisterForm";

const RegisterPage: React.FC = () => {
	const componentClass = "wtl-register-page";
	return (
		<section className={componentClass}>
			<RegisterForm />
		</section>
	);
};

export default RegisterPage;
