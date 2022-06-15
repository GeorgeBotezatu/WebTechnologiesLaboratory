import "./AddPostForm.scss";
import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
	YUP_POST_BODY_REQUIRED,
	YUP_POST_CATEGORY_REQUIRED,
} from "../../../../Utils/constants";
import TextInput from "../../../Atoms/TextInput/TextInput";
import TextareaInput from "../../../Atoms/TextareaInput/TextareaInput";
interface FormValues {
	text?: string;
	category?: string;
}

const AddPostForm: React.FC = () => {
	const validate = Yup.object({
		text: Yup.string().required(YUP_POST_BODY_REQUIRED),
		category: Yup.string().required(YUP_POST_CATEGORY_REQUIRED),
	});

	const initialValues: FormValues = {
		text: "",
		category: "",
	};
	const componentClass = "wtl-add-post-container";
	const formDescriptionClass = `${componentClass}--form-description`;
	const formContainerClass = `${componentClass}__form-container`;
	const titleContainerClass = `${formContainerClass}--title-container`;
	const descriptionClass = `${formContainerClass}--description`;

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validate}
			onSubmit={(values) => {
				// submitHandler(values);
			}}
		>
			{(formik) => (
				<div className={componentClass}>
					<p className={formDescriptionClass}>Add a new post</p>
					<Form className={formContainerClass}>
						<div className={titleContainerClass}>
							<TextInput
								type="text"
								id="title"
								name="title"
								placeholder="* Add your position title"
								labelText="* Add your position title"
							/>
							<p>Please do not create useless categories</p>
						</div>

						<div className={descriptionClass}>
							<TextareaInput
								placeholder="A short description of this job"
								name="description"
								id="description"
								withVerification={false}
							></TextareaInput>
							<p>Do a description of your problem</p>
						</div>
						<button type="submit">Submit</button>
					</Form>
				</div>
			)}
		</Formik>
	);
};

export default AddPostForm;
