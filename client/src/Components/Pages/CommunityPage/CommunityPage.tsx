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
	const { userProfile } = useSelector((state: RootState) => state.userProfile);
	const [buttonPopup, setButtonPopup] = useState<boolean>(false);
	const [items, setItems] = useState(postsList);
	useEffect(() => {
		setItems(postsList);
	}, [postsList]);

	const filterItem = (curcat: string) => {
		const newItem = postsList?.filter((newVal) => {
			return newVal.category === curcat;
		});
		setItems(newItem);
	};

	const myPosts = () => {
		const newItem = postsList?.filter((newVal) => {
			return newVal.user === userProfile.user._id;
		});
		setItems(newItem);
	};

	const componentClass = "wtl-community-page";
	const postContainer = `${componentClass}__posts-container`;
	const menuContainer = `${componentClass}--menu-container`;
	return (
		<div className={componentClass}>
			<div className={menuContainer}>
				<CategoriesMenu
					setTrigger={setButtonPopup}
					setItems={setItems}
					postsList={postsList}
					filterItem={filterItem}
					myPosts={myPosts}
				/>
			</div>
			<div className={postContainer}>
				{items &&
					items.map((item, index) => {
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
									{items.length - 1 > index && <hr />}
								</div>
							);
						}
						return "";
					})}
			</div>
			<PopUpBox trigger={buttonPopup} setTrigger={setButtonPopup}>
				<AddPostForm setTrigger={setButtonPopup} />
			</PopUpBox>
		</div>
	);
};

export default CommunityPage;
