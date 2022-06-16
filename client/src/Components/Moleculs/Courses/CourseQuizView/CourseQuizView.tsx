import "./CourseQuizView.scss";
import React, { useState } from "react";
import { ICourseChapterArr } from "../../../../Interfaces";
import { completeCourseChapterQuiz } from "../../../../API/profileAPI";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
	profileSaveQuizScoreFail,
	profileSaveQuizScoreInit,
	profileSaveQuizScoreSuccess,
} from "../../../../Store/features/profileSlice";
import { CAN_NOT_SAVE_QUIZ } from "../../../../Utils/constants";
import { RootState } from "../../../../Store/Store";

interface IQuizView {
	chapter?: ICourseChapterArr;
}
interface IForm {
	questionIndex?: number;
	questionAnswer?: string;
}

interface IFormArr extends Array<IForm> {}

const CourseQuizView: React.FC<IQuizView> = ({ chapter }) => {
	const componentClass = "wtl-course-quiz-view";
	const questionContainerClass = `${componentClass}__question-container`;
	const answersClass = `${questionContainerClass}__answers-container`;
	const answerContainerClass = `${answersClass}__answer`;
	const submitClass = `${componentClass}--submit`;
	const [formData, setFormData] = useState<IFormArr>([]);
	const { courseId, chapterId } = useParams();
	const dispatch = useDispatch();
	const handleOnChange = (e: any) => {
		let data = formData;
		data[Number(e.target.name)] = {
			questionIndex: Number(e.target.name),
			questionAnswer: e.target.value,
		};
		setFormData(data);
	};
	const navigate = useNavigate();
	const handleOnSubmit = async (e: any) => {
		e.preventDefault();
		try {
			const quiz = chapter && chapter[0].quiz;
			if (quiz) {
				let counter = 0;
				for (let i = 0; i < quiz?.length; i++) {
					if (formData[i].questionAnswer === "1") {
						if (quiz[i].answer1.correct === true) {
							counter++;
						}
					} else if (formData[i].questionAnswer === "2") {
						if (quiz[i].answer2.correct === true) {
							counter++;
						}
					} else if (formData[i].questionAnswer === "3") {
						if (quiz[i].answer3.correct === true) {
							counter++;
						}
					} else if (formData[i].questionAnswer === "4") {
						if (quiz[i].answer4.correct === true) {
							counter++;
						}
					}
				}

				const points = (100 * counter) / quiz?.length;

				dispatch(profileSaveQuizScoreInit());
				let res;
				if (courseId && chapterId)
					res = await completeCourseChapterQuiz(courseId, chapterId, points);
				if (!res) {
					dispatch(profileSaveQuizScoreFail(CAN_NOT_SAVE_QUIZ));
				} else {
					dispatch(profileSaveQuizScoreSuccess(res));
				}
			}
		} catch (error: any) {
			dispatch(profileSaveQuizScoreFail(error.message));
			console.log(error);
		}
	};
	const { userProfile } = useSelector((state: RootState) => state.userProfile);

	return (
		<form className={componentClass}>
			{userProfile &&
				userProfile.enroledCourses &&
				userProfile.enroledCourses &&
				userProfile.enroledCourses.map((course) => {
					if (course && course.quizScores) {
						return course.quizScores.map((item) => {
							if (item.chapterId === chapterId) {
								return (
									<h1 key={item.chapterId}>Your score is: {item.quizScore}</h1>
								);
							}
							return "";
						});
					}
					return "";
				})}
			{chapter &&
				chapter[0] &&
				chapter[0].quiz?.map((item, index) => {
					return (
						<div className={questionContainerClass} key={index}>
							<h2>
								{index + 1}. {item.question}
							</h2>
							<div className={answersClass}>
								<div className={answerContainerClass}>
									<input
										type="radio"
										id="answer1"
										name={index.toString()}
										value="1"
										onChange={(e) => {
											handleOnChange(e);
										}}
									/>
									<p>{item.answer1.text}</p>
								</div>
								<div className={answerContainerClass}>
									<input
										type="radio"
										id="answer2"
										name={index.toString()}
										value="2"
										onChange={(e) => {
											handleOnChange(e);
										}}
									/>
									<p>{item.answer2.text}</p>
								</div>
								<div className={answerContainerClass}>
									<input
										type="radio"
										id="answer3"
										name={index.toString()}
										value="3"
										onChange={(e) => {
											handleOnChange(e);
										}}
									/>
									<p>{item.answer3.text}</p>
								</div>
								<div className={answerContainerClass}>
									<input
										type="radio"
										id="answer4"
										name={index.toString()}
										value="4"
										onChange={(e) => {
											handleOnChange(e);
										}}
									/>
									<p>{item.answer4.text}</p>
								</div>
							</div>
						</div>
					);
				})}
			<button
				onClick={(e) => {
					handleOnSubmit(e);
				}}
				type="submit"
				className={submitClass}
			>
				Submit
			</button>
		</form>
	);
};

export default CourseQuizView;
