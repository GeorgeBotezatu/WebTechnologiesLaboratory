import "./EditAboutForm.scss";
import TextInput from "../../../Atoms/TextInput/TextInput";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { PROFILE_PATH } from "../../../../Routes/routesPath";
import {
	YUP_SKILLS_REQUIRED,
	YUP_STATUS_REQUIRED,
} from "../../../../Utils/constants";
import { useDispatch } from "react-redux";
import {
	profileEditAboutFail,
	profileEditAboutInit,
	profileEditAboutSuccess,
} from "../../../../Store/features/profileSlice";
import { updateAbout } from "../../../../API/profileAPI";

import TextareaInput from "../../../Atoms/TextareaInput/TextareaInput";
import { useLocation } from "react-router";
import { useEffect } from "react";

interface FormValues {
	website: string;
	skills: string;
	bio: string;
	status: string;
}
const EditAboutForm = () => {
	const { state } = useLocation();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!state?.buttonPressed || !state) {
			navigate("/profile");
		}
	}, [state, navigate]);
	const initialValues: FormValues = {
		website: state?.about?.website ? state?.about.website : "",
		skills: state?.about?.skills ? state?.about.skills.join() : "",
		bio: state?.about?.bio ? state?.about.bio : "",
		status: state?.about?.status ? state?.about.status : "",
	};
	const validate = Yup.object({
		skills: Yup.string().required(YUP_SKILLS_REQUIRED),
		status: Yup.string().required(YUP_STATUS_REQUIRED),
	});

	const submitHandler = async (values: FormValues) => {
		dispatch(profileEditAboutInit());
		try {
			const aboutData = {
				website: values.website,
				status: values.status,
				skills: values.skills,
				bio: values.bio,
			};
			const updateStateData = {
				website: values.website,
				status: values.status,
				skills: values.skills.split(",").map((skill) => skill.trim()),
				bio: values.bio,
			};

			await updateAbout(aboutData);

			dispatch(profileEditAboutSuccess(updateStateData));
			navigate("/profile");
		} catch (error: any) {
			dispatch(profileEditAboutFail(error.message));
		}
	};

	const componentClass = "wtl-about-form";
	const formInfoClass = `${componentClass}--info`;
	const formComponentClass = `${componentClass}__form`;
	const formGroupClass = `${formComponentClass}__group`;
	const formTextareaGroupClass = `${formComponentClass}__textarea-group`;
	const formAdditionalInfoClass = `${formComponentClass}--additional`;
	const formButtonsGroupClass = `${formComponentClass}__buttons-group`;
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
							<TextareaInput
								placeholder="A short bio of yourself"
								name="bio"
								id="bio"
								withVerification={false}
							></TextareaInput>
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
