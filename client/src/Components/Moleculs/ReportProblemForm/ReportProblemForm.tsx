import "./ReportProblemForm.scss";
import React from "react";
import TextareaInput from "../../Atoms/TextareaInput/TextareaInput";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import TextInput from "../../Atoms/TextInput/TextInput";
import {
	CAN_NOT_CREATE_PROBLEM,
	YUP_PROBLEM_DESCRIPTION_REQUIRED,
} from "../../../Utils/constants";
import {
	problemAddFail,
	problemAddInit,
	problemAddSuccess,
} from "../../../Store/features/problemSlice";
import { addProblem } from "../../../API/dashboardApi";

interface FormValues {
	description?: string;
	problemLink?: string;
}
interface IReportProblemForm {
	setTrigger: any;
}

const ReportProblemForm: React.FC<IReportProblemForm> = ({ setTrigger }) => {
	const dispatch = useDispatch();
	const validate = Yup.object({
		description: Yup.string().required(YUP_PROBLEM_DESCRIPTION_REQUIRED),
	});

	const initialValues: FormValues = {
		description: "",
		problemLink: "",
	};

	const submitHandler = async (values: FormValues) => {
		try {
			dispatch(problemAddInit());
			const res = await addProblem(values.description, values.problemLink);
			if (!res) {
				dispatch(problemAddFail(CAN_NOT_CREATE_PROBLEM));
			} else {
				dispatch(problemAddSuccess(res));
				setTrigger();
			}
		} catch (error: any) {
			dispatch(problemAddFail(error.message));
			console.log(error);
		}
	};

	const componentClass = "wtl-report-problem-container";
	const formDescriptionClass = `${componentClass}--form-description`;
	const formContainerClass = `${componentClass}__form-container`;
	const titleContainerClass = `${formContainerClass}--title-container`;
	const descriptionClass = `${formContainerClass}--description`;
	const submitButtonClass = `${formContainerClass}--submit`;
	const additionalInfoClass = `${formContainerClass}--info`;
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
					<p className={formDescriptionClass}>Report a problem!</p>
					<Form className={formContainerClass}>
						<div className={titleContainerClass}>
							<TextInput
								type="text"
								id="problemLink"
								name="problemLink"
								placeholder="Add a link to your problem (optional)"
								labelText="Add a link to your problem (optional)"
							/>
						</div>

						<div className={descriptionClass}>
							<TextareaInput
								validationMsg="Problem description is required!"
								placeholder="* Write your problem"
								name="description"
								id="description"
								withVerification={true}
							/>
							<p>Do a description of your problem</p>
						</div>

						<p className={additionalInfoClass}>
							Fields marked with <span>*</span> are required!
						</p>

						<button className={submitButtonClass} type="submit">
							Submit
						</button>
					</Form>
				</div>
			)}
		</Formik>
	);
};

export default ReportProblemForm;
