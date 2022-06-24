import "./NotFoundPage.scss";
import React from "react";

const NotFoundPage: React.FC = () => {
	const componetnClass = "wtl-not-found-page";
	return (
		<div className={componetnClass}>
			<p>
				HTTP: <span>404</span>
			</p>
			<code>
				<span>this_page</span>.<em>not_found</em> = true;
			</code>
			<code>
				<span>if</span> (<b>you_spelt_it_wrong</b>) &#123;
				<span>try_again()</span>;&#125;
			</code>
			<code>
				<span>
					else if (<b>we_screwed_up</b>)
				</span>{" "}
				&#123;<em>alert</em>(<i>"We're really sorry about that."</i>);{" "}
				<span>window</span>.<em>location</em> = home;&#125;
			</code>
		</div>
	);
};

export default NotFoundPage;
