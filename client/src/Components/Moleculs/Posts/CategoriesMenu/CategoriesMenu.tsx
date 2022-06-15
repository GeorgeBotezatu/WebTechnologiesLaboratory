import "./CategoriesMenu.scss";
import React from "react";

interface ICategoriesMenu {
	setTrigger: any;
}

const CategoriesMenu: React.FC<ICategoriesMenu> = ({ setTrigger }) => {
	const componentClass = "wtl-categories-menu-container";
	const titleClass = `${componentClass}--title`;
	const addBtnClass = `${componentClass}--add`;
	const optionsClass = `${componentClass}--options`;
	const myPosts = `${componentClass}--my-posts`;
	return (
		<div className={componentClass}>
			<h1 className={titleClass}>Categories</h1>
			<button onClick={setTrigger} className={addBtnClass}>
				Add new post
			</button>
			<div className={optionsClass}>
				<p>HTML</p>
				<p>CSS</p>
				<p>JS</p>
				<p>CONSOLE</p>
				<p>React</p>
			</div>
			<h1 className={myPosts}>My Questions</h1>
		</div>
	);
};

export default CategoriesMenu;
