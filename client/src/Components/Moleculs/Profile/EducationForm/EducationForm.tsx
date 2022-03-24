import "./EducationForm.scss";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import {
	YUP_DEGREE_REQUIRED,
	YUP_FIELDOFSTUDY_REQUIRED,
	YUP_FROM_DATE,
	YUP_SCHOOL_REQUIRED,
	YUP_START_DATE_REQUIRED,
	YUP_TO_DATE,
	YUP_TO_DATE_REQUIRED,
} from "../../../../Utils/constants";
import {
	profileUpdateEduFail,
	profileUpdateEduInit,
	profileUpdateEduSuccess,
} from "../../../../Store/features/profileSlice";
import { createEducation, editEducation } from "../../../../API/profileAPI";
import moment from "moment";
import TextInput from "../../../Atoms/TextInput/TextInput";
import TextareaInput from "../../../Atoms/TextareaInput/TextareaInput";
import { Link } from "react-router-dom";
import { PROFILE_PATH } from "../../../../Routes/routesPath";
interface FormValues {
	school?: string;
	degree?: string;
	fieldofstudy?: string;
	from?: Date | string;
	to?: Date | string;
	current?: boolean;
	description?: string;
}

const EducationForm = () => {
	const { state } = useLocation();
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [checked, setChecked] = useState<boolean>(
		state ? state.current : false
	);

	useEffect(() => {
		if ((!state?.buttonPressed || !state) && id) {
			navigate("/profile");
		}
	}, [state, navigate]);

	const validate = Yup.object({
		school: Yup.string().required(YUP_SCHOOL_REQUIRED),
		degree: Yup.string().required(YUP_DEGREE_REQUIRED),
		fieldofstudy: Yup.string().required(YUP_FIELDOFSTUDY_REQUIRED),
		from: Yup.string()
			.required(YUP_START_DATE_REQUIRED)
			.test("invalid-date", YUP_FROM_DATE, function (value: any): boolean {
				const fromDate = new Date(value);
				const today = new Date();
				if (today.getTime() < fromDate.getTime()) {
					return false;
				}
				return true;
			}),
		to: Yup.string()
			.test("invalid-to", YUP_TO_DATE, function (value: any): boolean {
				const toDate = new Date(value);
				const fromDate = new Date(this.parent.from);

				if (toDate.getTime() < fromDate.getTime()) {
					return false;
				}
				return true;
			})
			.test(
				"to-required",
				YUP_TO_DATE_REQUIRED,
				function (value: any): boolean {
					if (!checked && !value) {
						return false;
					}
					return true;
				}
			),
	});
	const submitHandler = async (values: FormValues) => {
		dispatch(profileUpdateEduInit());
		try {
			const eduData = {
				school: values.school,
				degree: values.degree,
				fieldofstudy: values.fieldofstudy,
				from: values.from,
				to: checked ? "" : values.to,
				current: checked,
				description: values.description,
			};

			let res;
			if (id) {
				res = await editEducation(eduData, id);
			} else {
				res = await createEducation(eduData);
			}
			if (!res) {
				dispatch(profileUpdateEduFail("Can't update this section!"));
			}
			dispatch(profileUpdateEduSuccess(res));
			navigate("/profile");
		} catch (error: any) {
			dispatch(profileUpdateEduFail(error.message));
		}
	};
	const initialValues: FormValues = {
		school: state && state.school ? state.school : "",
		degree: state && state.degree ? state.degree : "",
		fieldofstudy: state && state.fieldofstudy ? state.fieldofstudy : "",
		from: state && state.from ? moment(state.from).format("YYYY-MM-DD") : "",
		to: state && state.to ? moment(state.to).format("YYYY-MM-DD") : "",
		description: state && state.description ? state.description : "",
	};
	const componentClass = "wtl-education-form-container";
	const formDescriptionClass = `${componentClass}--form-description`;
	const formContainerClass = `${componentClass}__form-container`;
	const titleContainerClass = `${formContainerClass}--title-container`;
	const degreeFieldofstudyClass = `${formContainerClass}--degree-fieldofstudy`;
	const fromClass = `${formContainerClass}--from`;
	const currentContainerClass = `${formContainerClass}__current-job`;
	const checkboxClass = `${currentContainerClass}--checkbox`;
	const toClass = `${currentContainerClass}--to`;
	const descriptionClass = `${formContainerClass}--description`;
	const formAdditionalInfoClass = `${formContainerClass}--info`;
	const formButtonsGroupClass = `${formContainerClass}__buttons-group`;
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
					<p className={formDescriptionClass}>
						Add any school experiences/courses/certifications that you have had
						in the past!
					</p>
					<Form className={formContainerClass}>
						<div className={titleContainerClass}>
							<TextInput
								type="text"
								id="school"
								name="school"
								placeholder="* Add your school name"
								labelText="* Add your school name"
							/>
							<p>Here also you can add name of the courses/certifications! </p>
						</div>
						<div className={degreeFieldofstudyClass}>
							<div>
								<TextInput
									type="text"
									id="degree"
									name="degree"
									placeholder="* Add the degree "
									labelText="* Add the degree "
								/>
								<p>
									If there is no degree you can add name of the instructor or
									the platform name!
								</p>
							</div>
							<div>
								<TextInput
									type="text"
									id="fieldofstudy"
									name="fieldofstudy"
									placeholder="* Add the field of study"
									labelText="* Add the field of study"
								/>
								<p>
									Add the domain of the course/certificate (Ex. DataBases
									Architecture)
								</p>
							</div>
						</div>
						<div className={fromClass}>
							<TextInput
								type="date"
								id="from"
								name="from"
								placeholder="* Add the starting date"
								labelText="* Add the starting date"
							/>
							<p>You don't need to add the exact data. Just approximate!</p>
						</div>

						<div className={currentContainerClass}>
							<div className={checkboxClass}>
								<label htmlFor="current">Are you still learning here?</label>
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
										checked ? "" : "Add the ending day(If applicable)"
									}
									labelText={checked ? "" : "Add the ending day(If applicable)"}
								/>
								<p>
									{checked
										? "You are still learning no needed to add this!"
										: "You don't need to add the exact data. Just approximate!"}
								</p>
							</div>
						</div>
						<div className={descriptionClass}>
							<TextareaInput
								placeholder="A short description of this education"
								name="description"
								id="description"
							></TextareaInput>
							<p>Do a short description for us</p>
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

export default EducationForm;
