import "./ProblemItem.scss";
import React from "react";
import { IProblem } from "../../../../Interfaces";
import { calcultateDays } from "../../../../Utils/utilFunctions";
import { useDispatch } from "react-redux";
import {
	problemDeleteFail,
	problemDeleteInit,
	problemDeleteSuccess,
} from "../../../../Store/features/problemSlice";
import { deleteProblem } from "../../../../API/dashboardApi";
import { CAN_NOT_DELETE_PROBLEM } from "../../../../Utils/constants";

interface IProblemItem {
	problemItem: IProblem;
}

const ProblemItem: React.FC<IProblemItem> = ({ problemItem }) => {
	const dispatch = useDispatch();
	const deleteHandler = async (_id?: string) => {
		try {
			dispatch(problemDeleteInit());
			let res;
			if (_id) {
				res = await deleteProblem(_id);
			}
			if (!res) {
				dispatch(problemDeleteFail(CAN_NOT_DELETE_PROBLEM));
			} else {
				dispatch(problemDeleteSuccess(res));
			}
		} catch (error: any) {
			dispatch(problemDeleteFail(error.message));
			console.log(error);
		}
	};

	const componentClass = "wtl-problem-item";
	const firstSectionClass = `${componentClass}__first`;
	const secondSectionClass = `${componentClass}__second`;
	const thirdSectionClass = `${componentClass}__third`;

	return (
		<div className={componentClass}>
			<div className={firstSectionClass}>
				<h1>{problemItem?.name}</h1>
				<button
					onClick={() => {
						deleteHandler(problemItem?._id);
					}}
				>
					Problem Solved
				</button>
			</div>
			<div className={secondSectionClass}>
				<h2>{problemItem?.email}</h2>
				<p>{calcultateDays(problemItem?.date)} days ago</p>
			</div>
			<div className={thirdSectionClass}>
				{problemItem?.problemLink && (
					<p>
						<span>Link to the problem is: </span> {problemItem.problemLink}
					</p>
				)}
				<p>
					<span>Description of the problem: </span>
					{problemItem.description}
				</p>
			</div>
		</div>
	);
};

export default ProblemItem;
