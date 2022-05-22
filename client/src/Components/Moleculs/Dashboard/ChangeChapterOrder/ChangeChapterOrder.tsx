import "./ChangeChapterOrder.scss";
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "../../../Atoms/TextInput/TextInput";
import {
	CAN_NOT_CHANGE_ORDER,
	YUP_CHAPTER_ORDER_REQUIRED,
	YUP_INVALID_CHAPTER,
	YUP_SAME_CHAPTER_POSITION,
} from "../../../../Utils/constants";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import {
	changeChapterOrderFail,
	changeChapterOrderInit,
	changeChapterOrderSuccess,
} from "../../../../Store/features/courseSlice";
import { changeChapterOrder } from "../../../../API/coursesAPI";
import { ICourse } from "../../../../Interfaces";

interface IChangeChapterOrder {
	oldOrder: string;
	totalNumber?: number;
	chapterId?: string;
	setTrigger: any;
}
interface FormValues {
	order: number;
}

const ChangeChapterOrder: React.FC<IChangeChapterOrder> = ({
	oldOrder,
	totalNumber,
	chapterId,
	setTrigger,
}) => {
	const { courseId } = useParams();
	const dispatch = useDispatch();
	const initialValues: FormValues = {
		order: 1,
	};
	const submitHandler = async (values: { order: number }) => {
		try {
			dispatch(changeChapterOrderInit());
			let res;

			if (chapterId && courseId) {
				res = (await changeChapterOrder(
					courseId,
					chapterId,
					values.order
				)) as ICourse;
			}

			if (!res) {
				dispatch(changeChapterOrderFail(CAN_NOT_CHANGE_ORDER));
			} else {
				dispatch(changeChapterOrderSuccess(res));
			}
			setTrigger(false);
		} catch (error: any) {
			dispatch(changeChapterOrderFail(error.message));
		}
	};

	const validate = Yup.object({
		order: Yup.number()
			.required(YUP_CHAPTER_ORDER_REQUIRED)
			.test(
				"invalid-order",
				YUP_INVALID_CHAPTER + totalNumber,
				function (value: any): boolean {
					if (totalNumber) {
						if (value < 0) {
							return false;
						} else if (value > totalNumber) {
							return false;
						} else {
							return true;
						}
					}
					return true;
				}
			)
			.test(
				"invalid-chapter",
				YUP_SAME_CHAPTER_POSITION,
				function (value: any): boolean {
					if (oldOrder) {
						if (oldOrder === value) {
							return false;
						} else {
							return true;
						}
					}
					return true;
				}
			),
	});
	const componentClass = "wtl-change-chapter-order";
	const textInputClass = `${componentClass}--input`;
	const updateButtonClass = `${componentClass}--button`;
	return (
		<>
			<Formik
				initialValues={initialValues}
				validationSchema={validate}
				onSubmit={(values) => {
					submitHandler(values);
				}}
			>
				{(formik) => (
					<Form className={componentClass}>
						<h2>Change chapter order from: {oldOrder}</h2>
						<div className={textInputClass}>
							<TextInput
								type="number"
								id="order"
								name="order"
								placeholder="Add New order"
								labelText="New Order"
							></TextInput>
							<p>Add the new chapter order</p>
						</div>
						<button className={updateButtonClass} type="submit">
							Update
						</button>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default ChangeChapterOrder;
