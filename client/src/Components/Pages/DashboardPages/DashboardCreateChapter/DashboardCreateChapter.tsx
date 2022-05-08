import "./DashboardCreateChapter.scss";
import React, { useEffect, useRef, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import EditableTextField from "../../../Atoms/EditableTextField/EditableTextField";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ICourse } from "../../../../Interfaces";
import {
	chapterCreateFail,
	chapterCreateInit,
	chapterCreateSuccess,
	courseLoadFail,
	courseLoadInit,
	courseLoadSuccess,
} from "../../../../Store/features/courseSlice";
import {
	createChapter,
	loadCourse,
	updateChapter,
} from "../../../../API/coursesAPI";
import {
	CAN_NOT_CREATE_CHAPTER,
	CAN_NOT_LOAD_COURSE,
} from "../../../../Utils/constants";
import { RootState } from "../../../../Store/Store";

const DashboardCreateChapter: React.FC = () => {
	const { courseId, chapterId } = useParams();
	const [value, setValue] = useState<string>("Hello");
	const [chapterName, setChapterName] = useState<string>("Add chapter name");

	const { course } = useSelector((state: RootState) => state.course);
	useEffect(() => {
		if (course?.chapters)
			course?.chapters.map((chapter) => {
				if (chapter._id === chapterId) {
					if (chapter.chapterTitle) setChapterName(chapter.chapterTitle);
					if (chapter.content) setValue(chapter.content);
					return "";
				} else {
					return "";
				}
			});
	}, [courseId]); // eslint-disable-line react-hooks/exhaustive-deps

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
				}
				dispatch(courseLoadSuccess(res));
			} catch (error: any) {
				console.log(error);
				dispatch(courseLoadFail(error.message));
			}
		};
		loadCourseHandler();
	}, [courseId, dispatch]);

	const inputRef =
		useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>;

	const saveHandler = async () => {
		dispatch(chapterCreateInit());
		try {
			let res;
			if (chapterId && courseId) {
				res = (await updateChapter(
					chapterName,
					value,
					courseId,
					chapterId
				)) as ICourse;
			} else if (courseId)
				res = (await createChapter(chapterName, value, courseId)) as ICourse;
			if (!res) {
				dispatch(chapterCreateFail(CAN_NOT_CREATE_CHAPTER));
			}
			dispatch(chapterCreateSuccess(res));
			navigate(-1);
		} catch (error: any) {
			dispatch(chapterCreateFail(error.message));
			console.log(error);
		}
	};
	const componentClass = "wtl-dashboard-crate-chapter";
	const headContainerClass = `${componentClass}__head`;
	const saveButtonClass = `${headContainerClass}--save-button`;
	const textEditorClass = `${componentClass}--editor`;
	return (
		<div className={componentClass}>
			<h1>Create a chapter for {course?.courseTitle} </h1>
			<div className={headContainerClass}>
				<EditableTextField
					text={chapterName}
					placeholder="Add Chapter Name"
					type="input"
					childRef={inputRef}
					updateFunction={setChapterName}
				>
					<input
						type="text"
						ref={inputRef}
						name="chapterTitle"
						placeholder="Add Chapter Name"
						value={chapterName}
						onChange={(e) => {
							setChapterName(e.target.value);
						}}
					/>
				</EditableTextField>
				<button
					className={saveButtonClass}
					onClick={() => {
						saveHandler();
					}}
				>
					Save
				</button>
			</div>
			<MDEditor
				className={textEditorClass}
				value={value}
				onChange={(v) => setValue(v || "")}
			/>
		</div>
	);
};

export default DashboardCreateChapter;
