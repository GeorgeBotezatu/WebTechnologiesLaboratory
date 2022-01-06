import "./ProfileCard.scss";
import React, { useEffect, useRef, useState } from "react";
import EditableTextField from "../../Atoms/EditableTextField/EditableTextField";

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
	const [task, setTask] = useState<string>("");
	const calcultateDays = () => {
		if (profileDate) {
			const date = new Date(profileDate);
			const today = new Date();
			const diffTIme = today.getTime() - date.getTime();
			const diffDays = Math.round(diffTIme / (1000 * 3600 * 24));
			return diffDays;
		}
	};

	useEffect(() => {
		if (github) setTask(github);
	}, [github]);
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
						text={task}
						placeholder="Add github username"
						type="input"
						childRef={inputRef}
					>
						<input
							ref={inputRef}
							type="text"
							name="task"
							placeholder="Add github username"
							value={task}
							onChange={(e) => setTask(e.target.value)}
						/>
					</EditableTextField>
					{/* <p className={`${githubContainerClass}--p`}>GitHub: {github} </p>
						<button className={`${githubContainerClass}--edit-button`}>
							Edit GitHub Username
						</button> */}
				</div>

				<p className={registeredClass}>
					Registered: {calcultateDays()} days ago
				</p>
			</div>
		</div>
	);
};

export default ProfileCard;
