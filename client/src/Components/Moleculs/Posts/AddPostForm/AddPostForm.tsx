import "./AddPostForm.scss";
import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
	CAN_NOT_ADD_POST,
	YUP_POST_BODY_REQUIRED,
	YUP_POST_CATEGORY_REQUIRED,
} from "../../../../Utils/constants";
import TextInput from "../../../Atoms/TextInput/TextInput";
import TextareaInput from "../../../Atoms/TextareaInput/TextareaInput";
import { useDispatch } from "react-redux";
import {
	postAddFail,
	postAddInit,
	postAddSuccess,
} from "../../../../Store/features/postsSlice";
import { addPost } from "../../../../API/postApi";
interface FormValues {
	text?: string;
	category?: string;
}
interface IAddPostForm {
	setTrigger: any;
}

const AddPostForm: React.FC<IAddPostForm> = ({ setTrigger }) => {
	const dispatch = useDispatch();
	const validate = Yup.object({
		text: Yup.string().required(YUP_POST_BODY_REQUIRED),
		category: Yup.string().required(YUP_POST_CATEGORY_REQUIRED),
	});

	const initialValues: FormValues = {
		text: "",
		category: "",
	};

	const addPostHandler = async (values: FormValues) => {
		try {
			dispatch(postAddInit());
			const res = await addPost(values.text, values.category?.toLowerCase());

			if (!res) {
				dispatch(postAddFail(CAN_NOT_ADD_POST));
			} else {
				dispatch(postAddSuccess(res));
				setTrigger();
			}
		} catch (error: any) {
			dispatch(postAddFail(error.message));
			console.log(error);
		}
	};

	const componentClass = "wtl-add-post-container";
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
				addPostHandler(values);
			}}
		>
			{(formik) => (
				<div className={componentClass}>
					<p className={formDescriptionClass}>Add a new post</p>
					<Form className={formContainerClass}>
						<div className={titleContainerClass}>
							<TextInput
								type="text"
								id="category"
								name="category"
								placeholder="* Add your post category"
								labelText="* Add your post category"
							/>
							<p>Please do not create useless categories</p>
						</div>

						<div className={descriptionClass}>
							<TextareaInput
								validationMsg="Post body is required!"
								placeholder="* Write your problem"
								name="text"
								id="text"
								withVerification={true}
							></TextareaInput>
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

export default AddPostForm;
