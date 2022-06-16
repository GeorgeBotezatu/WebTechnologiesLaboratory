import "./CommentItem.scss";
import React from "react";
import {
	calcultateDays,
	getAdminCookie,
} from "../../../../Utils/utilFunctions";
import { CAN_NOT_DELETE_COMMENT, TRUE } from "../../../../Utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../Store/Store";
import {
	deleteCommentFail,
	deleteCommentInit,
	deleteCommentSuccess,
} from "../../../../Store/features/postSlice";
import { useParams } from "react-router";
import { deleteComment } from "../../../../API/postApi";

interface IComment {
	commentName?: string;
	commentDate?: string;
	commentText?: string;
	commentAvatar?: string;
	commentId?: string;
	userId?: string;
}

const CommentItem: React.FC<IComment> = ({
	commentName,
	commentDate,
	commentText,
	commentAvatar,
	commentId,
	userId,
}) => {
	const { userProfile } = useSelector((state: RootState) => state.userProfile);
	const dispatch = useDispatch();
	const { postId } = useParams();

	const deleteHandler = async () => {
		try {
			dispatch(deleteCommentInit());
			let res;
			console.log(commentId);
			if (postId && commentId) {
				res = await deleteComment(postId, commentId);
			}
			if (!res) {
				dispatch(deleteCommentFail(CAN_NOT_DELETE_COMMENT));
			} else {
				dispatch(deleteCommentSuccess(res));
			}
		} catch (error: any) {
			dispatch(deleteCommentFail(error.message));
			console.log(error);
		}
	};

	const componentClass = "wtl-comment-item-container";
	const logoClass = `${componentClass}--logo`;
	const contentContainerClass = `${componentClass}__content-container`;
	const nameAndDateClass = `${contentContainerClass}__name-and-date`;
	const nameClass = `${nameAndDateClass}--name`;
	const dateClass = `${nameAndDateClass}--date`;
	const textClass = `${contentContainerClass}--text`;
	const deleteButtonClass = `${contentContainerClass}--delete-button`;
	return (
		<div className={componentClass}>
			<div className={logoClass}>
				<img src={commentAvatar} alt="Logo" />
			</div>
			<div className={contentContainerClass}>
				<div className={nameAndDateClass}>
					<p className={nameClass}>{commentName}</p>
					<p className={dateClass}>{calcultateDays(commentDate)} days ago</p>
				</div>
				<p className={textClass}>{commentText}</p>
				{((userId && userProfile.user._id && userId === userProfile.user._id) ||
					getAdminCookie() === TRUE) && (
					<button
						type="button"
						onClick={() => {
							deleteHandler();
						}}
						className={deleteButtonClass}
					>
						Delete
					</button>
				)}
			</div>
		</div>
	);
};

export default CommentItem;
