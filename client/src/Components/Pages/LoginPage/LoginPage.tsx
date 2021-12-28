import React from "react";
import LoginForm from "../../Moleculs/LoginForm/LoginForm";
import "./LoginPage.scss";
const LoginPage = () => {
	const componentClass = "wtl-login-page";
	return (
		<section className={componentClass}>
			<LoginForm />
		</section>
	);
};

export default LoginPage;
