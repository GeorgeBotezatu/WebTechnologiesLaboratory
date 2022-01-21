import "./ExperienceForm.scss";
import React, { useState } from "react";
import TextInput from "../../../Atoms/TextInput/TextInput";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextareaInput from "../../../Atoms/TextareaInput/TextareaInput";
import { Link } from "react-router-dom";
import { PROFILE_PATH } from "../../../../Routes/routesPath";
import {
	YUP_COMPANY_NAME_REQUIRED,
	YUP_JOB_TITLE_REQUIRED,
	YUP_START_DATE_REQUIRED,
} from "../../../../Utils/constants";
import { useLocation } from "react-router";
import moment from "moment";
interface FormValues {
	title?: string;
	company?: string;
	location?: string;
	from?: Date | string;
	to?: Date | string;
	current?: boolean;
	description?: string;
}

const ExperienceForm = () => {
	const { state } = useLocation();
	console.log(state);

	const [checked, setChecked] = useState<boolean>(
		state ? state.current : false
	);

	const validate = Yup.object({
		title: Yup.string().required(YUP_JOB_TITLE_REQUIRED),
		company: Yup.string().required(YUP_COMPANY_NAME_REQUIRED),
		from: Yup.string().required(YUP_START_DATE_REQUIRED),
	});

	const initialValues: FormValues = {
		title: state && state.title ? state.title : "",
		company: state && state.company ? state.company : "",
		location: state && state.location ? state.location : "",
		from: state && state.from ? moment(state.from).format("YYYY-MM-DD") : "",
		to: state && state.to ? moment(state.to).format("YYYY-MM-DD") : "",
		description: state && state.description ? state.description : "",
	};

	console.log(initialValues);
	const componentClass = "wtl-experience-form-container";
	const formDescriptionClass = `${componentClass}--form-description`;
	const formContainerClass = `${componentClass}__form-container`;
	const titleContainerClass = `${formContainerClass}--title-container`;
	const companyLocationClass = `${formContainerClass}--company-location`;
	const fromClass = `${formContainerClass}--from`;
	const currentJobContainerClass = `${formContainerClass}__current-job`;
	const checkboxClass = `${currentJobContainerClass}--checkbox`;
	const toClass = `${currentJobContainerClass}--to`;
	const descriptionClass = `${formContainerClass}--description`;
	const formAdditionalInfoClass = `${formContainerClass}--info`;
	const formButtonsGroupClass = `${formContainerClass}__buttons-group`;
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validate}
			onSubmit={(values) => {
				console.log("nmk");
			}}
		>
			{(formik) => (
				<div className={componentClass}>
					<p className={formDescriptionClass}>
						Add any developer/programming positions that you have had in the
						past
					</p>
					<Form className={formContainerClass}>
						<div className={titleContainerClass}>
							<TextInput
								type="text"
								id="title"
								name="title"
								placeholder="* Add your position title"
								labelText="* Add your position title"
							/>
							<p>Let us know how your position is/was called! </p>
						</div>
						<div className={companyLocationClass}>
							<TextInput
								type="text"
								id="company"
								name="company"
								placeholder="* Add the company name "
								labelText="* Add the company name "
							/>

							<TextInput
								type="text"
								id="location"
								name="location"
								placeholder="Add the city were you worked"
								labelText="Add the city were you worked"
							/>
						</div>
						<div className={fromClass}>
							<TextInput
								type="date"
								id="from"
								name="from"
								placeholder="* Add the starting date of the job"
								labelText="* Add the starting date of the job"
							/>
							<p>You don't need to add the exact data. Just approximate!</p>
						</div>

						<div className={currentJobContainerClass}>
							<div className={checkboxClass}>
								<label htmlFor="current">Is this your current job?</label>
								<input
									onChange={() => {
										setChecked(!checked);
									}}
									type="checkbox"
									id="current"
									name="current"
									checked={checked}
								/>
							</div>
							<div className={toClass}>
								<TextInput
									disabled={checked}
									type="date"
									id="to"
									name="to"
									placeholder={
										checked ? "" : "Add the last day at this job(If applicable)"
									}
									labelText={
										checked ? "" : "Add the last day at this job(If applicable)"
									}
								/>
								<p>
									{checked
										? "This is your current job no needed to add this!"
										: "You don't need to add the exact data. Just approximate!"}
								</p>
							</div>
						</div>
						<div className={descriptionClass}>
							<TextareaInput
								placeholder="A short description of this job"
								name="description"
								id="description"
							></TextareaInput>
							<p>Do a short job description for us</p>
						</div>
						<p className={formAdditionalInfoClass}>
							Fields marked with <span>*</span> are required!
						</p>
						<div className={formButtonsGroupClass}>
							<button type="submit">Submit</button>
							<Link to={PROFILE_PATH}>Go Back</Link>
						</div>
					</Form>
				</div>
			)}
		</Formik>
	);
};

export default ExperienceForm;