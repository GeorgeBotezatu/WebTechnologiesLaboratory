import "./EditQuizForm.scss";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../Store/Store";
import { ICourse } from "../../../../Interfaces";
import {
	addQuizFail,
	addQuizInit,
	addQuizSuccess,
	courseLoadFail,
	courseLoadInit,
	courseLoadSuccess,
} from "../../../../Store/features/courseSlice";
import { createQuiz, loadCourse } from "../../../../API/coursesAPI";
import {
	CAN_NOT_CREATE_QUIZ,
	CAN_NOT_LOAD_COURSE,
} from "../../../../Utils/constants";

interface IForm {
	question?: string;
	answer1?: string;
	answer2?: string;
	answer3?: string;
	answer4?: string;
	correct?: string;
	errors: {
		question: string | null;
		answer1: string | null;
		answer2: string | null;
		answer3: string | null;
		answer4: string | null;
		correct: string | null;
	};
}
interface IFormArr extends Array<IForm> {}

const EditQuizForm = () => {
	const state = useSelector((state: RootState) => state.course).course;
	const { chapterId, courseId } = useParams();
	const chapter = state?.chapters?.filter((item) => item._id === chapterId);
	const [form, setForm] = useState<IFormArr>([]);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		let res: ICourse;
		const loadCourseHandler = async () => {
			dispatch(courseLoadInit());
			try {
				if (courseId) res = (await loadCourse(courseId)) as ICourse;
				if (!res) {
					dispatch(courseLoadFail(CAN_NOT_LOAD_COURSE));
				} else {
					dispatch(courseLoadSuccess(res));
				}
			} catch (error: any) {
				console.log(error);
				dispatch(courseLoadFail(error.message));
			}
		};
		loadCourseHandler();
	}, [courseId, dispatch]);
	const getData = () => {
		if (chapter) {
			const questions: IFormArr = [];
			chapter[0].quiz?.map((item) => {
				let myQuestionItem;
				if (item)
					myQuestionItem = {
						question: item.question,
						answer1: item.answer1.text,
						answer2: item.answer2.text,
						answer3: item.answer3.text,
						answer4: item.answer4.text,
						correct:
							item.answer1.correct === true
								? "1"
								: item.answer2.correct === true
								? "2"
								: item.answer3.correct === true
								? "3"
								: "4",
						errors: {
							question: null,
							answer1: null,
							answer2: null,
							answer3: null,
							answer4: null,
							correct: null,
						},
					};

				if (myQuestionItem) {
					questions.push(myQuestionItem);
				}
				return true;
			});

			if (questions) setForm(questions);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const formIsValid = () => {
		if (form.length === 0) {
			return true;
		}

		const someEmpty = form.some(
			(item) =>
				item.question === "" ||
				item.answer1 === "" ||
				item.answer2 === "" ||
				item.answer3 === "" ||
				item.answer4 === ""
		);
		if (someEmpty) {
			form.map((item, index) => {
				const allForm = [...form];

				if (form[index].question === "")
					allForm[index].errors.question = "Question is empty";
				if (form[index].answer1 === "")
					allForm[index].errors.answer1 = "Question is empty";
				if (form[index].answer2 === "")
					allForm[index].errors.answer2 = "Question is empty";
				if (form[index].answer3 === "")
					allForm[index].errors.answer3 = "Question is empty";
				if (form[index].answer4 === "")
					allForm[index].errors.answer4 = "Question is empty";
				if (form[index].correct === "")
					allForm[index].errors.correct = "Question is empty";
				setForm(allForm);
				return true;
			});
		}

		return !someEmpty;
	};

	const handleAddLink = (e: any) => {
		e.preventDefault();
		const inputState = {
			question: "",
			answer1: "",
			answer2: "",
			answer3: "",
			answer4: "",
			correct: "",

			errors: {
				question: null,
				answer1: null,
				answer2: null,
				answer3: null,
				answer4: null,
				correct: null,
			},
		};
		if (formIsValid()) {
			setForm([...form, inputState]);
		}
	};
	const onChange = (index: number, event: any) => {
		// event.preventDefault();
		event.persist();
		setForm(
			form.map((item, i) => {
				if (i !== index) {
					return item;
				} else {
					return {
						...item,
						[event.target.name]: event.target.value,

						errors: {
							...item.errors,
							[event.target.name]:
								event.target.value.length > 0
									? null
									: [event.target.name] + "is required",
						},
					};
				}
			})
		);
	};
	const handleRemoveField = (e: any, index: number) => {
		e.preventDefault();

		setForm(
			form.filter((item) => {
				return item !== form[index];
			})
		);
	};

	const submitHandler = async (e: any) => {
		dispatch(addQuizInit());
		try {
			const submitData = [];
			for (let i = 0; i < form.length; i++) {
				let obj = {
					question: form[i].question,
					answer1: {
						text: form[i].answer1,
						correct: Number(form[i].correct) === 1 ? true : false,
					},
					answer2: {
						text: form[i].answer2,
						correct: Number(form[i].correct) === 2 ? true : false,
					},
					answer3: {
						text: form[i].answer3,
						correct: Number(form[i].correct) === 3 ? true : false,
					},
					answer4: {
						text: form[i].answer4,
						correct: Number(form[i].correct) === 4 ? true : false,
					},
				};
				submitData.push(obj);
			}
			let res;
			if (courseId && chapterId)
				res = await createQuiz(courseId, chapterId, submitData);
			if (!res) {
				dispatch(addQuizFail(CAN_NOT_CREATE_QUIZ));
			} else {
				dispatch(addQuizSuccess(res));
				navigate(`/dashboard/learning/course/${courseId}`);
			}
		} catch (error: any) {
			dispatch(addQuizFail(error.message));
			console.log(error);
		}
	};

	const componentClass = "wtl-edit-quiz-form";
	const buttonGroupClass = `${componentClass}__btn-group`;
	const submitClass = `${buttonGroupClass}--submit`;
	const addClass = `${buttonGroupClass}--add`;
	const inputGrupClass = `${componentClass}__input-group`;
	const inputContainerClass = `${inputGrupClass}__container`;
	const deleteBtnClass = `${inputContainerClass}--delete`;
	const inputClass = `${inputContainerClass}__input`;
	const correctInputClass = `${inputClass}--correct`;
	const incorrectInputClass = `${inputClass}--incorrect`;
	const errorMsgClass = `${inputContainerClass}--error-msg`;
	const checkGroupClass = `${inputGrupClass}__check-group`;
	const checkContainerClass = `${checkGroupClass}__check-container`;
	const checkClass = `${checkContainerClass}--check`;
	return (
		<div className={componentClass}>
			<h1>Start Creating your quiz!</h1>
			<div>
				{form.map((item, index) => {
					return (
						<div className={inputGrupClass} key={index}>
							<div className={inputContainerClass}>
								<div className={inputClass}>
									<label htmlFor="question">Question: </label>
									<input
										className={
											item.errors.question
												? incorrectInputClass
												: correctInputClass
										}
										type="text"
										name="question"
										placeholder="Type Here..."
										value={item.question}
										onChange={(e) => {
											onChange(index, e);
										}}
									/>
								</div>
								{item.errors.question && (
									<p className={errorMsgClass}>Question can`t be empty!</p>
								)}
							</div>

							<div className={inputContainerClass}>
								<div className={inputClass}>
									<label htmlFor="answer1">Answer 1 :</label>
									<input
										className={
											item.errors.answer1
												? incorrectInputClass
												: correctInputClass
										}
										type="text"
										name="answer1"
										placeholder="Type Here..."
										value={item.answer1}
										onChange={(e) => {
											onChange(index, e);
										}}
									/>
								</div>
								{item.errors.answer1 && (
									<p className={errorMsgClass}>First answer can`t be empty!</p>
								)}
							</div>
							<div className={inputContainerClass}>
								<div className={inputClass}>
									<label htmlFor="answer2">Answer 2 :</label>
									<input
										className={
											item.errors.answer2
												? incorrectInputClass
												: correctInputClass
										}
										type="text"
										name="answer2"
										placeholder="Type Here..."
										value={item.answer2}
										onChange={(e) => {
											onChange(index, e);
										}}
									/>
								</div>
								{item.errors.answer2 && (
									<p className={errorMsgClass}>Second answer can`t be empty!</p>
								)}
							</div>
							<div className={inputContainerClass}>
								<div className={inputClass}>
									<label htmlFor="answer3">Answer 3 :</label>
									<input
										className={
											item.errors.answer3
												? incorrectInputClass
												: correctInputClass
										}
										type="text"
										name="answer3"
										placeholder="Type Here..."
										value={item.answer3}
										onChange={(e) => {
											onChange(index, e);
										}}
									/>
								</div>
								{item.errors.answer3 && (
									<p className={errorMsgClass}>Third answer can`t be empty!</p>
								)}
							</div>
							<div className={inputContainerClass}>
								<div className={inputClass}>
									<label htmlFor="answer4">Answer 4 :</label>
									<input
										className={
											item.errors.answer4
												? incorrectInputClass
												: correctInputClass
										}
										type="text"
										name="answer4"
										placeholder="Type Here..."
										value={item.answer4}
										onChange={(e) => {
											onChange(index, e);
										}}
									/>
								</div>
								{item.errors.answer4 && (
									<p className={errorMsgClass}>Fourth answer can`t be empty!</p>
								)}
							</div>

							<div className={checkGroupClass}>
								<div className={checkContainerClass}>
									<p>
										Please select just one (Otherwise just last one will count):{" "}
									</p>

									<div className={checkClass}>
										<label htmlFor="answer1">1: </label>
										<input
											type="checkbox"
											name="correct"
											id="answer1"
											value="1"
											checked={"1" === item.correct ? true : false}
											onChange={(e) => {
												onChange(index, e);
											}}
										/>
									</div>
									<div className={checkClass}>
										<label htmlFor="answer2">2:</label>
										<input
											type="checkbox"
											name="correct"
											id="answer2"
											value="2"
											checked={"2" === item.correct ? true : false}
											onChange={(e) => {
												onChange(index, e);
											}}
										/>
									</div>
									<div className={checkClass}>
										<label htmlFor="answer3">3:</label>
										<input
											type="checkbox"
											name="correct"
											id="answer3"
											value="3"
											checked={"3" === item.correct ? true : false}
											onChange={(e) => {
												onChange(index, e);
											}}
										/>
									</div>
									<div className={checkClass}>
										<label htmlFor="answer4">4:</label>
										<input
											type="checkbox"
											name="correct"
											id="answer4"
											value="4"
											checked={"4" === item.correct ? true : false}
											onChange={(e) => {
												onChange(index, e);
											}}
										/>
									</div>
								</div>
								{item.errors.correct && <p>Fourth answer can`t be empty!</p>}
							</div>

							<button
								className={deleteBtnClass}
								onClick={(e) => {
									handleRemoveField(e, index);
								}}
							>
								Delete this Question
							</button>
						</div>
					);
				})}
				<div className={buttonGroupClass}>
					<button
						className={addClass}
						onClick={(e) => {
							handleAddLink(e);
						}}
					>
						Add Question
					</button>
					{form.length > 0 && (
						<button
							onClick={(e: any) => {
								submitHandler(e);
							}}
							className={submitClass}
						>
							Submit
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default EditQuizForm;
