import "./CourseQuizView.scss";
import React from "react";
import { ICourseChapterArr } from "../../../../Interfaces";

interface IQuizView {
	chapter?: ICourseChapterArr;
}

const CourseQuizView: React.FC<IQuizView> = ({ chapter }) => {
	const componentClass = "wtl-course-quiz-view";
	const questionContainerClass = `${componentClass}__question-container`;
	const answersClass = `${questionContainerClass}__answers-container`;
	const answerContainerClass = `${answersClass}__answer`;
	const submitClass = `${componentClass}--submit`;

	return (
		<div className={componentClass}>
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
									/>
									<p>{item.answer1.text}</p>
								</div>
								<div className={answerContainerClass}>
									<input
										type="radio"
										id="answer2"
										name={index.toString()}
										value="2"
									/>
									<p>{item.answer2.text}</p>
								</div>
								<div className={answerContainerClass}>
									<input
										type="radio"
										id="answer3"
										name={index.toString()}
										value="3"
									/>
									<p>{item.answer3.text}</p>
								</div>
								<div className={answerContainerClass}>
									<input
										type="radio"
										id="answer4"
										name={index.toString()}
										value="4"
									/>
									<p>{item.answer4.text}</p>
								</div>
							</div>
						</div>
					);
				})}
			<button className={submitClass}>Submit</button>
		</div>
	);
};

export default CourseQuizView;
