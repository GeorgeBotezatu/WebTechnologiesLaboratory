import "./ProfileCard.scss";
import React, { useEffect, useRef, useState } from "react";
import EditableTextField from "../../Atoms/EditableTextField/EditableTextField";
import { calcultateDays } from "../../../Utils/utilFunctions";
import {
	profileGithubFail,
	profileGithubInit,
	profileGithubSuccess,
} from "../../../Store/features/profileSlice";
import { useDispatch } from "react-redux";
import { updateGithub } from "../../../API/profileAPI";

interface CardInterface {
	github: string | null;
	userCard: {
		_id: string;
		name: string;
		email: string;
		avatar: string;
	} | null;
	profileDate: Date | null;
}

const ProfileCard: React.FC<CardInterface> = ({
	github,
	profileDate,
	userCard,
}) => {
	const inputRef =
		useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>;
	const [githubField, setGithubField] = useState<string>("");
	const dispatch = useDispatch();

	useEffect(() => {
		if (github) setGithubField(github);
	}, [github]);

	const updateGit = (text: string) => {
		dispatch(profileGithubInit());
		if (text) {
			try {
				updateGithub(text);
				dispatch(profileGithubSuccess(text));
			} catch (error: any) {
				dispatch(profileGithubFail(error.message));
			}
		}
	};

	const componentClass = "wtl-profile-card";
	const usernameContainerClass = `${componentClass}__username-container`;
	const cardContainerClass = `${componentClass}__card-container`;
	const imageContainerClass = `${cardContainerClass}__image-container`;
	const emailClass = `${cardContainerClass}--email`;
	const registeredClass = `${cardContainerClass}--registered`;
	const githubContainerClass = `${cardContainerClass}__github-container`;

	return (
		<div className={componentClass}>
			<div className={usernameContainerClass}>
				<p className={`${usernameContainerClass}--p`}>
					{userCard?.name && userCard.name}
				</p>
			</div>

			<div className={cardContainerClass}>
				<div className={imageContainerClass}>
					<img src={userCard?.avatar && userCard.avatar} alt="user-avatar" />
				</div>
				<p className={emailClass}>
					Email: {userCard?.email && userCard.email}{" "}
				</p>

				<div className={githubContainerClass}>
					<span>GitHub: </span>
					<EditableTextField
						text={githubField}
						placeholder="Add github username"
						type="input"
						childRef={inputRef}
						updateFunction={updateGit}
					>
						<input
							ref={inputRef}
							type="text"
							name="githubField"
							placeholder="Add github username"
							value={githubField}
							onChange={(e) => setGithubField(e.target.value)}
						/>
					</EditableTextField>
				</div>

				<p className={registeredClass}>
					Registered: {calcultateDays(profileDate)} days ago
				</p>
			</div>
		</div>
	);
};

export default ProfileCard;
