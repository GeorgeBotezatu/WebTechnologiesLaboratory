import "./RegisterForm.scss";
import React from "react";

const RegisterForm: React.FC = () => {
	return (
		<div>
			<div>
				<p>
					Welcome to <span>wtl.</span>Complete a few steps to join our
					community!
				</p>
				<form>
					<label htmlFor="username">Username</label>
					<input type="text" id="username" placeholder="Username" />
					<label htmlFor="email">Email</label>
					<input type="email" id="email" />
					<label htmlFor="password">Password</label>
					<input type="password" id="password" />
					<label htmlFor="confirm_password">Confirm Password</label>
					<input type="password" id="confirm_password" />
					<button type="submit">Submit</button>
				</form>
			</div>
			<div>
				<p>
					Random fact about web <span>design :</span>
				</p>
				<p>86% of visitors want info about prosucts/service on the hompage</p>
				<div>Rectangle 1</div>
				<div>Rectangle 2</div>
			</div>
		</div>
	);
};

export default RegisterForm;
