import "./DashboardEditQuizPage.scss";
import React from "react";
import EditQuizForm from "../../../Moleculs/Dashboard/EditQuizForm/EditQuizForm";

const DashboardCreateEditPage = () => {
	const componentClass = "wtl-dashboard-edit-quiz";
	return (
		<div className={componentClass}>
			<EditQuizForm />
		</div>
	);
};

export default DashboardCreateEditPage;
