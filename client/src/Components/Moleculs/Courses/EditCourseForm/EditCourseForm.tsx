import "./EditCourseForm.scss";
import React from "react";
import { ICoursesListItem } from "../../../../Interfaces";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import {
	CAN_NOT_UPDATE_COURSE,
	YUP_COURSE_DESCRIPTION_REQUIRED,
	YUP_COURSE_TITLE_REQUIRED,
} from "../../../../Utils/constants";
import TextInput from "../../../Atoms/TextInput/TextInput";
import TextareaInput from "../../../Atoms/TextareaInput/TextareaInput";
import { LANDING_PATH } from "../../../../Routes/routesPath";
import { Link } from "react-router-dom";
import { createCourse, updateCourse } from "../../../../API/coursesAPI";
import {
	addNewCourseFail,
	addNewCourseInit,
	addNewCourseSuccess,
	editCourseItemFail,
	editCourseItemInit,
	editCourseItemSuccess,
} from "../../../../Store/features/coursesSlice";

interface FormValues {
	courseTitle?: string;
	courseDescription?: string;
}

const EditCourseForm: React.FC<ICoursesListItem> = ({
	courseDescription,
	courseTitle,
	_id,
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const initialValues: FormValues = {
		courseTitle: courseTitle ? courseTitle : "",
		courseDescription: courseDescription ? courseDescription : "",
	};

	const validate = Yup.object({
		courseTitle: Yup.string().required(YUP_COURSE_TITLE_REQUIRED),
		courseDescription: Yup.string().required(YUP_COURSE_DESCRIPTION_REQUIRED),
	});

	const editSubmitHandler = async (values: FormValues) => {
		dispatch(editCourseItemInit());
		try {
			const data = {
				courseTitle: values.courseTitle,
				courseDescription: values.courseDescription,
				_id: _id,
			};
			const res = await updateCourse(data);
			if (!res) {
				dispatch(editCourseItemFail(CAN_NOT_UPDATE_COURSE));
			} else {
				dispatch(editCourseItemSuccess(res));
				navigate("/learning");
			}
		} catch (error: any) {
			console.log(error);
			dispatch(editCourseItemFail(error.message));
		}
	};

	const createSubmitHandler = async (values: FormValues) => {
		dispatch(addNewCourseInit());
		try {
			const data = {
				courseTitle: values.courseTitle,
				courseDescription: values.courseDescription,
			};
			const res = await createCourse(data);
			if (!res) {
				dispatch(addNewCourseFail(CAN_NOT_UPDATE_COURSE));
			} else {
				dispatch(addNewCourseSuccess(res));
				navigate("/learning");
			}
		} catch (error: any) {
			console.log(error);
			dispatch(addNewCourseFail(error.message));
		}
	};

	const componentClass = "wtl-edit-course-form";
	const formContainerClass = `${componentClass}__form-container`;
	const inputContainerClass = `${formContainerClass}__input-container`;
	const formTitleClass = `${componentClass}--title`;
	const infoClass = `${componentClass}--info`;
	const textareaContainerClass = `${formContainerClass}__textarea-container`;
	const formButtonsGroupClass = `${formContainerClass}__buttons-group`;
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validate}
			onSubmit={(values) => {
				if (_id) {
					editSubmitHandler(values);
				} else {
					createSubmitHandler(values);
				}
			}}
		>
			{(formik) => (
				<div className={componentClass}>
					<h2 className={formTitleClass}>Add your data here!</h2>
					<Form className={formContainerClass}>
						<div className={inputContainerClass}>
							<TextInput
								type="text"
								id="courseTitle"
								name="courseTitle"
								placeholder="Add course title"
								labelText="Add course title"
							></TextInput>
						</div>
						<div className={textareaContainerClass}>
							<label htmlFor="courseDescription">Course Description: </label>
							<TextareaInput
								withVerification={true}
								id="courseDescription"
								name="courseDescription"
								placeholder="Add course description"
								validationMsg={YUP_COURSE_DESCRIPTION_REQUIRED}
							></TextareaInput>
						</div>
						<div className={formButtonsGroupClass}>
							<button type="submit">Submit</button>
							<Link to={LANDING_PATH}>Go Back</Link>
						</div>
					</Form>

					<p className={infoClass}>
						<span>*</span> All fields are required!
					</p>
				</div>
			)}
		</Formik>
	);
};

export default EditCourseForm;
