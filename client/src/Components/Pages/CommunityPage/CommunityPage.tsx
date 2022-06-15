import "./CommunityPage.scss";
import React, { useEffect, useState } from "react";
import CategoriesMenu from "../../Moleculs/Posts/CategoriesMenu/CategoriesMenu";
import { useSelector } from "react-redux";
import { RootState } from "../../../Store/Store";
import PostBody from "../../Moleculs/Posts/PostBody/PostBody";
import PopUpBox from "../../Moleculs/PopUpBox/PopUpBox";
import AddPostForm from "../../Moleculs/Posts/AddPostForm/AddPostForm";

const CommunityPage: React.FC = () => {
	const { postsList } = useSelector((state: RootState) => state.postsSlice);
	const [buttonPopup, setButtonPopup] = useState<boolean>(false);
	useEffect(() => {}, [postsList]);

	const componentClass = "wtl-community-page";
	const postContainer = `${componentClass}__posts-container`;
	const menuContainer = `${componentClass}--menu-container`;
	return (
		<div className={componentClass}>
			<div className={menuContainer}>
				<CategoriesMenu setTrigger={setButtonPopup} />
			</div>
			<div className={postContainer}>
				{postsList &&
					postsList.map((item, index) => {
						if (item) {
							return (
								<div key={item._id}>
									<PostBody
										name={item?.name}
										data={item?.date}
										text={item?.text}
										_id={item?._id}
										numberOfLikes={item?.likes?.length}
										userId={item?.user}
										avatar={item?.avatar}
										numberOfComments={item?.comments?.length}
									/>
									{postsList.length - 1 > index && <hr />}
								</div>
							);
						}
						return "";
					})}
			</div>
			<PopUpBox trigger={buttonPopup} setTrigger={setButtonPopup}>
				<AddPostForm />
			</PopUpBox>
		</div>
	);
};

export default CommunityPage;
