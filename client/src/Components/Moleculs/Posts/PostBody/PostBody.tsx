import "./PostBody.scss";
import React from "react";
import {
	calcultateDays,
	getAdminCookie,
} from "../../../../Utils/utilFunctions";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router";
import {
	CAN_NOT_DELETE_POST,
	CAN_NOT_LIKE_POST,
	TRUE,
} from "../../../../Utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../Store/Store";
import {
	postDeleteFail,
	postDeleteInit,
	postDeleteSuccess,
} from "../../../../Store/features/postsSlice";
import { deletePost, likePost } from "../../../../API/postApi";
import {
	postLikeFail,
	postLikeInit,
	postLikeSuccess,
} from "../../../../Store/features/postSlice";

interface IPostBody {
	name?: string;
	data?: string;
	text?: string;
	_id?: string;
	numberOfLikes?: number;
	userId?: string;
	avatar?: string;
	numberOfComments?: number;
}

const PostBody: React.FC<IPostBody> = ({
	_id,
	data,
	name,
	numberOfLikes,
	text,
	userId,
	avatar,
	numberOfComments,
}) => {
	const { postId } = useParams();
	const { userProfile } = useSelector((state: RootState) => state.userProfile);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const deleteHandler = async () => {
		try {
			dispatch(postDeleteInit());
			let res;
			if (postId) {
				res = await deletePost(postId);
			}
			if (!res) {
				dispatch(postDeleteFail(CAN_NOT_DELETE_POST));
			} else {
				dispatch(postDeleteSuccess(res));
				navigate("/community");
			}
		} catch (error: any) {
			dispatch(postDeleteFail(error.message));
			console.log(error);
		}
	};

	const likeHandler = async () => {
		try {
			dispatch(postLikeInit());
			let res;
			if (postId) {
				res = await likePost(postId);
			}
			if (!res) {
				dispatch(postLikeFail(CAN_NOT_LIKE_POST));
			} else {
				dispatch(postLikeSuccess(res));
			}
		} catch (error: any) {
			dispatch(postLikeFail(error.message));
			console.log(error);
		}
	};

	const componentClass = "wtl-post-body-container";
	const deleteBtnClass = `${componentClass}--delete`;
	const headerClass = `${componentClass}__header`;
	const imgConatinerClass = `${headerClass}--img`;
	const userNameClass = `${headerClass}--name`;
	const postTextClass = `${componentClass}--text`;
	const bottomPostClass = `${componentClass}__bottom-post`;
	const likeClass = `${bottomPostClass}--like`;
	const likePostClass = `${bottomPostClass}--like-post`;
	const buttonGroupClass = `${bottomPostClass}__btn-group`;

	const commentsButtonClass = `${buttonGroupClass}--comments`;
	return (
		<div className={componentClass}>
			{postId &&
				(getAdminCookie() === TRUE || userId === userProfile.user._id) && (
					<button
						onClick={() => {
							deleteHandler();
						}}
						className={deleteBtnClass}
					>
						Delete Post
					</button>
				)}
			<div className={headerClass}>
				<div className={imgConatinerClass}>
					<img src={avatar} alt="avatar-img" />
				</div>
				<div className={userNameClass}>
					<h2>{name}</h2>
					<p>{calcultateDays(data)} days ago</p>
				</div>
			</div>
			<p className={postTextClass}>{text}</p>
			<div className={bottomPostClass}>
				{!postId ? (
					<p className={likeClass}>
						<span>{numberOfLikes}</span> Up Votes
					</p>
				) : (
					<button
						onClick={() => {
							likeHandler();
						}}
						className={likePostClass}
					>
						<span>{numberOfLikes}</span> Up Votes
					</button>
				)}
				<div className={buttonGroupClass}>
					<Link to={`/community/post/${_id}`} className={commentsButtonClass}>
						{numberOfComments} Answers
					</Link>
				</div>
			</div>
		</div>
	);
};

export default PostBody;
