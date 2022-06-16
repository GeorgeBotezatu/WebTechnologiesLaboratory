import "./PostPage.scss";
import React, { useEffect, useState } from "react";
import PostBody from "../../Moleculs/Posts/PostBody/PostBody";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Store/Store";
import { useParams } from "react-router";
import {
	addCommentFail,
	addCommentInit,
	addCommentSuccess,
	postLoadFail,
	postLoadInit,
	postLoadSuccess,
} from "../../../Store/features/postSlice";
import {
	CAN_NOT_ADD_COMMENT,
	CAN_NOT_LOAD_POST,
} from "../../../Utils/constants";
import { addComment, getPost } from "../../../API/postApi";
import CommentItem from "../../Moleculs/Posts/CommentItem/CommentItem";

const PostPage: React.FC = () => {
	const dispatch = useDispatch();
	const { postId } = useParams();
	const [comment, setComment] = useState("");
	useEffect(() => {
		const loadPlatformData = async () => {
			try {
				dispatch(postLoadInit());
				let res;
				if (postId) {
					res = await getPost(postId);
				}
				if (!res) {
					dispatch(postLoadFail(CAN_NOT_LOAD_POST));
				}
				dispatch(postLoadSuccess(res));
			} catch (error: any) {
				dispatch(postLoadFail(error.message));
			}
		};
		loadPlatformData();
	}, [dispatch, postId]);
	const { post } = useSelector((state: RootState) => state.post);
	useEffect(() => {}, [post]);

	const commentHandler = (e: any) => {
		setComment(e.target.value);
	};

	const submitCommentHandler = async (e: any) => {
		try {
			e.preventDefault();
			dispatch(addCommentInit());
			let res;
			if (postId) {
				res = await addComment(postId, comment);
			}
			if (!res) {
				dispatch(addCommentFail(CAN_NOT_ADD_COMMENT));
			} else {
				dispatch(addCommentSuccess(res));
				window.location.reload();
			}
		} catch (error: any) {
			console.log(error);
			dispatch(addCommentFail(error.message));
		}
	};

	const componentClass = "wtl-post-page";
	const commentSectionClass = `${componentClass}__comment-section`;
	const formClass = `${commentSectionClass}__form`;
	return (
		<div className={componentClass}>
			<PostBody
				name={post?.name}
				data={post?.date}
				text={post?.text}
				_id={post?._id}
				numberOfLikes={post?.likes?.length}
				userId={post?.user}
				avatar={post?.avatar}
				numberOfComments={post?.comments?.length}
			/>
			<hr />

			<div className={commentSectionClass}>
				<h1>Comments :</h1>
				<div>
					<form className={formClass}>
						<input
							type="text"
							placeholder="Add your comment"
							value={comment}
							onChange={(e) => {
								commentHandler(e);
							}}
						/>
						<button
							type="submit"
							onClick={(e) => {
								if (comment !== "") {
									submitCommentHandler(e);
								} else {
									console.log(comment);
								}
							}}
						>
							Add Comment
						</button>
					</form>
				</div>
			</div>
			<div>
				{post &&
					post.comments &&
					post.comments.map((item) => {
						if (item) {
							return (
								<CommentItem
									commentName={item?.name}
									commentDate={item?.date}
									commentText={item?.text}
									commentAvatar={item?.avatar}
									commentId={item?._id}
									userId={item?.user}
								/>
							);
						}
						return "";
					})}
			</div>
		</div>
	);
};

export default PostPage;
