import "./SocialForm.scss";

import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextInput from "../../../Atoms/TextInput/TextInput";
import { Link } from "react-router-dom";
import { PROFILE_PATH } from "../../../../Routes/routesPath";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import { YUP_URL_HTTP } from "../../../../Utils/constants";
import { useDispatch } from "react-redux";
import {
	profileSocialFail,
	profileSocialInit,
	profileSocialSuccess,
} from "../../../../Store/features/profileSlice";
import { editSocial } from "../../../../API/profileAPI";

interface FormValues {
	facebook?: string;
	youtube?: string;
	twitter?: string;
	linkedin?: string;
	instagram?: string;
}

const SocialForm: React.FC = () => {
	const { state } = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
		if (!state?.buttonPressed || !state?.socialLinks || !state) {
			navigate("/profile");
		}
	}, [state, navigate]);
	const initialValues: FormValues = {
		youtube: state?.socialLinks?.youtube ? state?.socialLinks?.youtube : "",
		twitter: state?.socialLinks?.twitter ? state?.socialLinks?.twitter : "",
		facebook: state?.socialLinks?.facebook ? state?.socialLinks?.facebook : "",
		linkedin: state?.socialLinks?.linkedin ? state?.socialLinks?.linkedin : "",
		instagram: state?.socialLinks?.instagram
			? state?.socialLinks?.instagram
			: "",
	};

	const validate = Yup.object({
		youtube: Yup.string().matches(
			/^([h][t]{2}[p]s?[:][/]{2}\S{1,})$/,
			YUP_URL_HTTP
		),
		twitter: Yup.string().matches(
			/^([h][t]{2}[p]s?[:][/]{2}\S{1,})$/,
			YUP_URL_HTTP
		),
		facebook: Yup.string().matches(
			/^([h][t]{2}[p]s?[:][/]{2}\S{1,})$/,
			YUP_URL_HTTP
		),
		linkedin: Yup.string().matches(
			/^([h][t]{2}[p]s?[:][/]{2}\S{1,})$/,
			YUP_URL_HTTP
		),
		instagram: Yup.string().matches(
			/^([h][t]{2}[p]s?[:][/]{2}\S{1,})$/,
			YUP_URL_HTTP
		),
	});

	const submitHandler = async (values: FormValues) => {
		dispatch(profileSocialInit());
		try {
			const res = await editSocial(values);
			if (!res) {
				dispatch(profileSocialFail("Can't update this section!"));
			} else {
				dispatch(profileSocialSuccess(res));
				navigate("/profile");
			}
		} catch (error: any) {
			dispatch(profileSocialFail(error.message));
		}
	};

	const componentClass = "wtl-social-form-container";
	const formContainerClass = `${componentClass}__form-container`;
	const inputContainerClass = `${formContainerClass}__input-container`;
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
					<Form className={formContainerClass}>
						<div className={inputContainerClass}>
							<i className="fab fa-linkedin "></i>
							<TextInput
								type="text"
								id="linkedin"
								name="linkedin"
								placeholder="Add URL to account"
								labelText="Add URL to account"
							/>
						</div>
						<div className={inputContainerClass}>
							<i className="fab fa-facebook-f "></i>
							<TextInput
								type="text"
								id="facebook"
								name="facebook"
								placeholder="Add URL to account"
								labelText="Add URL to account"
							/>
						</div>
						<div className={inputContainerClass}>
							<i className="fab fa-instagram "></i>
							<TextInput
								type="text"
								id="instagram"
								name="instagram"
								placeholder="Add URL to account"
								labelText="Add URL to account"
							/>
						</div>
						<div className={inputContainerClass}>
							<i className="fab fa-twitter "></i>
							<TextInput
								type="text"
								id="twitter"
								name="twitter"
								placeholder="Add URL to account"
								labelText="Add URL to account"
							/>
						</div>
						<div className={inputContainerClass}>
							<i className="fab fa-youtube "></i>
							<TextInput
								type="text"
								id="youtube"
								name="youtube"
								placeholder="Add URL to account"
								labelText="Add URL to account"
							/>
						</div>

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

export default SocialForm;
