import "./EditAboutForm.scss";
import React from "react";
import TextInput from "../../Atoms/TextInput/TextInput";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { PROFILE_PATH } from "../../../Routes/routesPath";
import {
	YUP_SKILLS_REQUIRED,
	YUP_STATUS_REQUIRED,
} from "../../../Utils/constants";

interface FormValues {
	website: string;
	skills: string;
	bio: string;
	status: string;
}
const EditAboutForm = () => {
	const initialValues: FormValues = {
		website: "",
		skills: "",
		bio: "",
		status: "",
	};
	const validate = Yup.object({
		skills: Yup.string().required(YUP_SKILLS_REQUIRED),
		status: Yup.string().required(YUP_STATUS_REQUIRED),
	});
	const componentClass = "wtl-about-form";
	const formInfoClass = `${componentClass}--info`;
	const formComponentClass = `${componentClass}__form`;
	const formGroupClass = `${formComponentClass}__group`;
	const formTextareaGroupClass = `${formComponentClass}__textarea-group`;
	const textareaClass = `${formTextareaGroupClass}--textarea`;
	const formAdditionalInfoClass = `${formComponentClass}--additional`;
	const formButtonsGroupClass = `${formComponentClass}__buttons-group`;
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validate}
			onSubmit={(values) => {
				console.log("aici");
			}}
		>
			{(formik) => (
				<div className={componentClass}>
					<p className={formInfoClass}>
						Let's get some information to make your profile to look great!
					</p>
					<Form className={formComponentClass}>
						<div className={formGroupClass}>
							<TextInput
								type="text"
								id="status"
								name="status"
								placeholder="* Add your professional status"
								labelText="* Add your professional status"
							/>
							<p>Give us an idea of where you are at in your career</p>
						</div>
						<div className={formGroupClass}>
							<TextInput
								type="text"
								id="skills"
								name="skills"
								placeholder="* Add your skill set"
								labelText="* Add your skill set"
							/>
							<p>
								Please use comma separated values (eg. HTML, CSS, JavaScript,
								PHP)
							</p>
						</div>
						<div className={formGroupClass}>
							<TextInput
								type="text"
								id="website"
								name="website"
								placeholder="Add your website URL"
								labelText="Add your website URL"
							/>
							<p>Could be your own or a company website</p>
						</div>
						<div className={formTextareaGroupClass}>
							<textarea
								className={textareaClass}
								placeholder="A short bio of yourself"
								name="bio"
							></textarea>
							<p>Tell us a little about yourself</p>
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

export default EditAboutForm;
