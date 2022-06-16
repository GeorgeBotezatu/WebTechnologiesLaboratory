import "./CategoriesMenu.scss";
import React from "react";
import { IPostsArr } from "../../../../Interfaces";

interface ICategoriesMenu {
	setTrigger: any;
	postsList?: IPostsArr;
	setItems?: any;
	filterItem?: any;
	myPosts?: any;
}

const CategoriesMenu: React.FC<ICategoriesMenu> = ({
	setTrigger,
	postsList,
	setItems,
	filterItem,
	myPosts,
}) => {
	const menuItems = [...new Set(postsList?.map((Val) => Val.category))];

	const componentClass = "wtl-categories-menu-container";
	const titleClass = `${componentClass}--title`;
	const addBtnClass = `${componentClass}--add`;
	const optionsClass = `${componentClass}--options`;
	const myPostsClass = `${componentClass}--my-posts`;
	return (
		<div className={componentClass}>
			<h1 className={titleClass}>Categories</h1>
			<button onClick={setTrigger} className={addBtnClass}>
				Add new post
			</button>
			<div className={optionsClass}>
				{menuItems.map((val, id) => {
					return (
						<p key={id} onClick={() => filterItem(val)}>
							{val?.toUpperCase()}
						</p>
					);
				})}
			</div>
			<h1
				className={myPostsClass}
				onClick={() => {
					setItems(postsList);
				}}
			>
				All Questions
			</h1>
			<h1 onClick={myPosts} className={myPostsClass}>
				My Questions
			</h1>
		</div>
	);
};

export default CategoriesMenu;
