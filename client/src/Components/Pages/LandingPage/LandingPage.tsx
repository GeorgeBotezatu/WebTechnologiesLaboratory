import "./LandingPage.scss";

import React from "react";
import { Link } from "react-router-dom";
import { REGISTER_PATH } from "../../../Routes/routesPath";

const LandingPage = () => {
	const componentClass = "wtl-landing";
	const textSideClass = `${componentClass}__text-side`;
	const descriptionClass = `${textSideClass}--description`;
	const successSectionClass = `${textSideClass}__success-section`;
	const successTitleClass = `${successSectionClass}--title`;
	const successStepsClass = `${successSectionClass}__steps`;
	const fancyButtonContainerClass = `${successSectionClass}__fancy-button`;
	const joinButtonContainerClass = `${fancyButtonContainerClass}__button-container`;
	const masButtonContainerClass = `${fancyButtonContainerClass}__mas`;
	const joinButtonClass = `${joinButtonContainerClass}--join-button`;
	const svgSideClass = `${componentClass}__SVG`;

	return (
		<section className={componentClass}>
			<div className={textSideClass}>
				<h1 className={descriptionClass}>
					<span className={`${descriptionClass}--bold`}>HERE!</span>{" "}
					<span className={`${descriptionClass}--highlighted`}>
						On Web Technologies Laboratory{" "}
					</span>
					you will found 3 learning paths designed{" "}
					<span className={`${descriptionClass}--highlighted`}>for you!</span>
				</h1>
				<div className={successSectionClass}>
					<h3 className={successTitleClass}>Success Recipe</h3>
					<div className={successStepsClass}>
						<p>1. Learn - our Learning Path</p>
						<p>2. Code - our Console</p>
						<p>3. Be creative</p>
						<p>4. Repeat 1, 2, 3 on each Learning Path!</p>
					</div>
					<div className={fancyButtonContainerClass}>
						<div className={joinButtonContainerClass}>
							<Link to={REGISTER_PATH} className={joinButtonClass}>
								JOIN US TO ACCESS LEARNING PATH
							</Link>
						</div>
						<div className={masButtonContainerClass}>
							<span className={joinButtonClass}>
								JOIN US TO ACCESS LEARNING PATH
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className={svgSideClass}>
				<svg
					width="735"
					height="282"
					viewBox="0 0 735 282"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g id="undraw_graduation_re_gthn 2">
						<path
							id="Path 438"
							d="M21.0907 248.924C23.6727 249.853 26.4448 250.085 29.1402 249.599C31.8355 249.113 34.3632 247.925 36.4796 246.149C41.8696 241.518 43.5598 233.892 44.9344 226.828L49.0015 205.934L40.4868 211.935C34.3631 216.251 28.1019 220.705 23.8623 226.956C19.6227 233.207 17.7731 241.74 21.1785 248.504"
							fill="#E6E6E6"
						/>
						<path
							id="Path 439"
							d="M22.4055 275.674C21.3338 267.682 20.2311 259.587 20.9847 251.51C21.6524 244.336 23.7907 237.33 28.144 231.584C30.4547 228.54 33.2664 225.932 36.4527 223.877C37.2834 223.341 38.0481 224.688 37.221 225.223C31.7077 228.789 27.4433 234.055 25.0426 240.262C22.3913 247.164 21.9655 254.688 22.4222 262.02C22.6983 266.454 23.2849 270.859 23.874 275.259C23.9205 275.458 23.8915 275.667 23.7927 275.845C23.694 276.023 23.533 276.156 23.3422 276.217C23.1475 276.271 22.9401 276.244 22.7648 276.142C22.5896 276.04 22.4606 275.871 22.406 275.673L22.4055 275.674Z"
							fill="#F2F2F2"
						/>
						<path
							id="Path 442"
							d="M30.1196 262.85C31.2268 264.573 32.7489 265.975 34.5392 266.921C36.3296 267.867 38.3278 268.326 40.3414 268.252C45.5172 268 49.8303 264.304 53.7127 260.795L65.1985 250.415L57.5971 250.042C52.1306 249.774 46.5229 249.523 41.3162 251.25C36.1094 252.978 31.3076 257.129 30.3556 262.645"
							fill="#E6E6E6"
						/>
						<path
							id="Path 443"
							d="M19.3765 280.268C24.5361 270.923 30.5202 260.538 41.2138 257.219C44.1869 256.299 47.3044 255.97 50.3984 256.248C51.3736 256.335 51.1301 257.873 50.1568 257.787C44.9704 257.346 39.7941 258.748 35.4991 261.756C31.4616 264.755 28.0386 268.535 25.4246 272.884C23.7561 275.485 22.2617 278.195 20.7673 280.902C20.2898 281.768 18.8934 281.143 19.3765 280.268Z"
							fill="#F2F2F2"
						/>
						<path
							id="Path 438_2"
							d="M493.045 236.709C496.601 237.988 500.418 238.309 504.13 237.64C507.841 236.971 511.322 235.334 514.237 232.888C521.659 226.512 523.987 216.009 525.88 206.282L531.48 177.51L519.755 185.774C511.322 191.717 502.7 197.85 496.862 206.458C491.024 215.066 488.477 226.817 493.166 236.131"
							fill="#E6E6E6"
						/>
						<path
							id="Path 439_2"
							d="M494.856 273.546C493.38 262.541 491.861 251.393 492.899 240.27C493.819 230.392 496.763 220.745 502.758 212.831C505.94 208.64 509.812 205.049 514.199 202.219C515.343 201.48 516.396 203.335 515.257 204.071C507.665 208.982 501.793 216.234 498.487 224.781C494.836 234.286 494.25 244.647 494.879 254.744C495.259 260.85 496.067 266.916 496.878 272.974C496.942 273.248 496.902 273.537 496.766 273.782C496.63 274.027 496.408 274.21 496.146 274.294C495.878 274.368 495.592 274.331 495.351 274.19C495.109 274.05 494.932 273.818 494.856 273.545L494.856 273.546Z"
							fill="#F2F2F2"
						/>
						<path
							id="Path 442_2"
							d="M505.479 255.887C507.003 258.26 509.099 260.19 511.565 261.493C514.03 262.796 516.782 263.427 519.554 263.325C526.682 262.979 532.621 257.89 537.968 253.056L553.784 238.762L543.317 238.25C535.789 237.881 528.067 237.534 520.897 239.913C513.727 242.292 507.114 248.008 505.803 255.605"
							fill="#E6E6E6"
						/>
						<path
							id="Path 443_2"
							d="M490.684 279.872C497.789 267.004 506.03 252.704 520.756 248.133C524.85 246.866 529.143 246.412 533.403 246.796C534.746 246.915 534.411 249.033 533.071 248.915C525.929 248.308 518.801 250.238 512.886 254.381C507.195 258.346 502.763 263.859 499.013 269.704C496.715 273.286 494.657 277.018 492.6 280.746C491.942 281.938 490.019 281.077 490.684 279.872Z"
							fill="#F2F2F2"
						/>
						<path
							id="Star"
							d="M426.453 43.0944C425.704 42.7604 425.101 42.1561 424.759 41.3965C424.416 40.6368 424.359 39.7749 424.597 38.9748C424.636 38.8522 424.66 38.7253 424.67 38.5968V38.5968C424.692 38.2302 424.598 37.8662 424.401 37.5587C424.205 37.2511 423.918 37.0164 423.581 36.8893C423.244 36.7622 422.877 36.7495 422.532 36.853C422.188 36.9565 421.886 37.1707 421.67 37.464V37.464C421.595 37.568 421.533 37.6807 421.485 37.7996C421.159 38.5665 420.568 39.1838 419.826 39.534C419.084 39.8843 418.242 39.9429 417.46 39.6989C417.34 39.6594 417.216 39.6345 417.091 39.6248V39.6248C416.733 39.6025 416.377 39.6988 416.076 39.8996C415.776 40.1003 415.547 40.3947 415.423 40.7393C415.298 41.0839 415.286 41.4602 415.387 41.8126C415.488 42.1649 415.697 42.4746 415.984 42.6957C416.086 42.7717 416.196 42.8352 416.312 42.8848C417.061 43.2188 417.664 43.8232 418.006 44.5828C418.349 45.3424 418.406 46.2043 418.167 47.0044C418.129 47.1271 418.105 47.254 418.095 47.3824V47.3824C418.073 47.749 418.167 48.113 418.363 48.4206C418.56 48.7281 418.847 48.9628 419.184 49.0899C419.521 49.217 419.888 49.2298 420.232 49.1263C420.577 49.0228 420.879 48.8085 421.095 48.5152V48.5152C421.17 48.4112 421.232 48.2986 421.28 48.1796C421.606 47.4127 422.197 46.7954 422.939 46.4452C423.681 46.095 424.523 46.0363 425.305 46.2803C425.425 46.3198 425.549 46.3447 425.674 46.3544V46.3544C426.032 46.3768 426.388 46.2804 426.688 46.0797C426.989 45.879 427.218 45.5845 427.342 45.2399C427.467 44.8954 427.479 44.519 427.378 44.1667C427.277 43.8143 427.068 43.5046 426.781 43.2835V43.2835C426.679 43.2075 426.569 43.1441 426.453 43.0944Z"
							fill="#F9FE00"
						/>
						<path
							id="Star_2"
							d="M489.894 194.298C489.144 193.964 488.541 193.36 488.199 192.6C487.857 191.841 487.799 190.979 488.038 190.179C488.077 190.056 488.101 189.929 488.11 189.801V189.801C488.132 189.434 488.038 189.07 487.842 188.763C487.646 188.455 487.358 188.22 487.021 188.093C486.685 187.966 486.317 187.953 485.973 188.057C485.629 188.16 485.326 188.375 485.11 188.668V188.668C485.036 188.772 484.974 188.885 484.925 189.003C484.599 189.77 484.009 190.388 483.266 190.738C482.524 191.088 481.682 191.147 480.9 190.903C480.781 190.863 480.657 190.838 480.531 190.829V190.829C480.173 190.806 479.817 190.903 479.517 191.103C479.216 191.304 478.987 191.599 478.863 191.943C478.739 192.288 478.726 192.664 478.827 193.016C478.929 193.369 479.138 193.678 479.424 193.9C479.526 193.976 479.636 194.039 479.752 194.089C480.502 194.423 481.105 195.027 481.447 195.787C481.789 196.546 481.846 197.408 481.608 198.208C481.569 198.331 481.545 198.458 481.535 198.586C481.514 198.953 481.608 199.317 481.804 199.624C482 199.932 482.288 200.167 482.624 200.294C482.961 200.421 483.329 200.434 483.673 200.33C484.017 200.227 484.32 200.012 484.536 199.719C484.61 199.615 484.672 199.502 484.72 199.384C485.047 198.617 485.637 197.999 486.379 197.649C487.122 197.299 487.964 197.24 488.745 197.484C488.865 197.524 488.989 197.549 489.115 197.558V197.558C489.473 197.581 489.828 197.484 490.129 197.284C490.429 197.083 490.659 196.788 490.783 196.444C490.907 196.099 490.919 195.723 490.818 195.371C490.717 195.018 490.508 194.708 490.221 194.487V194.487C490.12 194.411 490.01 194.348 489.894 194.298V194.298Z"
							fill="#F9FE00"
						/>
						<path
							id="Star_3"
							d="M157.286 106.173C156.536 105.839 155.933 105.235 155.591 104.475C155.249 103.716 155.192 102.854 155.43 102.054C155.469 101.931 155.493 101.804 155.502 101.676V101.676C155.524 101.309 155.43 100.945 155.234 100.638C155.038 100.33 154.75 100.095 154.414 99.9682C154.077 99.8411 153.709 99.8283 153.365 99.9318C153.021 100.035 152.718 100.25 152.502 100.543V100.543C152.428 100.647 152.366 100.76 152.317 100.878C151.991 101.645 151.401 102.263 150.658 102.613C149.916 102.963 149.074 103.022 148.293 102.778C148.173 102.738 148.049 102.713 147.923 102.704V102.704C147.565 102.681 147.209 102.778 146.909 102.978C146.609 103.179 146.379 103.474 146.255 103.818C146.131 104.163 146.118 104.539 146.22 104.891C146.321 105.244 146.53 105.553 146.816 105.775C146.918 105.851 147.028 105.914 147.144 105.964C147.894 106.298 148.497 106.902 148.839 107.662C149.181 108.421 149.238 109.283 149 110.083C148.961 110.206 148.937 110.333 148.928 110.461V110.461C148.906 110.828 149 111.192 149.196 111.499C149.392 111.807 149.68 112.042 150.016 112.169C150.353 112.296 150.721 112.309 151.065 112.205C151.409 112.102 151.712 111.887 151.928 111.594V111.594C152.002 111.49 152.064 111.377 152.113 111.258C152.439 110.492 153.029 109.874 153.771 109.524C154.514 109.174 155.356 109.115 156.137 109.359C156.257 109.399 156.381 109.424 156.507 109.433V109.433C156.865 109.456 157.221 109.359 157.521 109.159C157.821 108.958 158.051 108.663 158.175 108.319C158.299 107.974 158.312 107.598 158.21 107.246C158.109 106.893 157.9 106.583 157.613 106.362V106.362C157.512 106.286 157.402 106.223 157.286 106.173V106.173Z"
							fill="#F9FE00"
						/>
						<path
							id="Particle"
							d="M296.043 51.9473C299.046 51.9473 301.48 49.4554 301.48 46.3815C301.48 43.3076 299.046 40.8157 296.043 40.8157C293.04 40.8157 290.605 43.3076 290.605 46.3815C290.605 49.4554 293.04 51.9473 296.043 51.9473Z"
							fill="#F1F1F1"
						/>
						<path
							id="Particle_2"
							d="M586.055 37.1052C589.058 37.1052 591.493 34.6133 591.493 31.5394C591.493 28.4655 589.058 25.9736 586.055 25.9736C583.052 25.9736 580.617 28.4655 580.617 31.5394C580.617 34.6133 583.052 37.1052 586.055 37.1052Z"
							fill="#084711"
						/>
						<path
							id="Particle_3"
							d="M163.724 11.1316C166.728 11.1316 169.162 8.63969 169.162 5.56579C169.162 2.49189 166.728 0 163.724 0C160.721 0 158.287 2.49189 158.287 5.56579C158.287 8.63969 160.721 11.1316 163.724 11.1316Z"
							fill="#CBCBCB"
						/>
						<path
							id="Vector"
							d="M142.813 264.088C164.369 264.088 181.844 246.202 181.844 224.138C181.844 202.073 164.369 184.187 142.813 184.187C121.256 184.187 103.781 202.073 103.781 224.138C103.781 246.202 121.256 264.088 142.813 264.088Z"
							fill="#2F2E41"
						/>
						<path
							id="Vector_2"
							d="M136.884 255.491H125.026V277.236H136.884V255.491Z"
							fill="#2F2E41"
						/>
						<path
							id="Vector_3"
							d="M160.599 255.491H148.742V277.236H160.599V255.491Z"
							fill="#2F2E41"
						/>
						<path
							id="Vector_4"
							d="M134.908 281.282C140.365 281.282 144.789 279.584 144.789 277.489C144.789 275.395 140.365 273.697 134.908 273.697C129.45 273.697 125.026 275.395 125.026 277.489C125.026 279.584 129.45 281.282 134.908 281.282Z"
							fill="#2F2E41"
						/>
						<path
							id="Vector_5"
							d="M158.623 280.776C164.08 280.776 168.504 279.078 168.504 276.984C168.504 274.889 164.08 273.191 158.623 273.191C153.166 273.191 148.742 274.889 148.742 276.984C148.742 279.078 153.166 280.776 158.623 280.776Z"
							fill="#2F2E41"
						/>
						<path
							id="Vector_6"
							d="M184.873 206.68C193.326 198.021 198.026 188.8 195.37 186.084C192.714 183.368 183.709 188.185 175.256 196.844C166.803 205.503 162.104 214.724 164.759 217.44C167.415 220.156 176.42 215.339 184.873 206.68Z"
							fill="#2F2E41"
						/>
						<path
							id="Vector_7"
							d="M111.352 220.223C114.008 217.507 109.308 208.286 100.856 199.627C92.4026 190.968 83.3973 186.151 80.7416 188.867C78.086 191.583 82.7856 200.804 91.2385 209.463C99.6914 218.122 108.697 222.939 111.352 220.223Z"
							fill="#2F2E41"
						/>
						<path
							id="Vector_8"
							d="M141.171 232.13C148.538 232.13 154.511 226.017 154.511 218.476C154.511 210.935 148.538 204.822 141.171 204.822C133.804 204.822 127.831 210.935 127.831 218.476C127.831 226.017 133.804 232.13 141.171 232.13Z"
							fill="white"
						/>
						<path
							id="Vector_9"
							d="M141.171 223.027C143.627 223.027 145.617 220.99 145.617 218.476C145.617 215.962 143.627 213.925 141.171 213.925C138.715 213.925 136.724 215.962 136.724 218.476C136.724 220.99 138.715 223.027 141.171 223.027Z"
							fill="#3F3D56"
						/>
						<path
							id="Vector_10"
							d="M151.76 243.729C152.172 246.045 151.668 248.435 150.359 250.372C149.05 252.308 147.043 253.633 144.779 254.055C142.515 254.477 140.181 253.961 138.289 252.621C136.397 251.281 135.102 249.226 134.69 246.909V246.909L134.687 246.892C133.834 242.066 137.479 240.359 142.193 239.485C146.908 238.612 150.907 238.903 151.76 243.729Z"
							fill="white"
						/>
						<path
							id="Vector_11"
							d="M181.086 266.066C180.207 266.067 179.365 266.425 178.744 267.061C178.122 267.697 177.773 268.559 177.772 269.458V276.543C177.773 277.442 178.122 278.304 178.744 278.94C179.365 279.576 180.207 279.933 181.086 279.935H234.402C235.281 279.933 236.123 279.576 236.744 278.94C237.366 278.304 237.715 277.442 237.716 276.543V269.458C237.715 268.559 237.366 267.697 236.744 267.061C236.123 266.425 235.281 266.067 234.402 266.066H181.086Z"
							fill="#E5E5E5"
						/>
						<path
							id="Vector_12"
							d="M211.747 261.348C211.417 261.153 211.025 261.1 210.657 261.201C210.289 261.302 209.975 261.549 209.784 261.887L207.803 265.399L205.861 261.472C205.689 261.124 205.389 260.86 205.027 260.738C204.665 260.616 204.27 260.647 203.93 260.823C203.59 260.999 203.332 261.306 203.214 261.677C203.095 262.048 203.125 262.452 203.297 262.8L204.808 265.856H204.254V280.145H211.644V265.856H210.864L212.273 263.358C212.464 263.02 212.515 262.618 212.417 262.241C212.318 261.865 212.077 261.543 211.747 261.348V261.348Z"
							fill="#084711"
						/>
						<path
							id="Vector_13"
							d="M141.808 197.933C134.873 197.926 127.978 196.848 121.358 194.736C120.898 194.584 120.496 194.287 120.211 193.887C119.926 193.488 119.771 193.006 119.77 192.512V176.25C119.77 175.635 120.009 175.046 120.434 174.611C120.859 174.176 121.435 173.932 122.035 173.931H161.912C162.513 173.932 163.089 174.176 163.513 174.611C163.938 175.046 164.177 175.635 164.178 176.25V192.502C164.178 193.001 164.021 193.487 163.731 193.888C163.441 194.288 163.032 194.583 162.566 194.728C155.837 196.832 148.843 197.912 141.808 197.933V197.933Z"
							fill="#084711"
						/>
						<path
							id="Vector_14"
							opacity="0.2"
							d="M163.725 176.25V178.968L142.146 186.714C141.742 186.856 141.303 186.85 140.904 186.695L120.223 178.745V176.25C120.224 175.758 120.415 175.287 120.755 174.94C121.095 174.592 121.555 174.396 122.035 174.395H161.912C162.392 174.396 162.852 174.592 163.192 174.94C163.532 175.287 163.723 175.758 163.725 176.25Z"
							fill="black"
						/>
						<path
							id="Vector_15"
							d="M141.542 183.57C141.27 183.571 141 183.521 140.746 183.423L109.84 171.545C109.403 171.377 109.028 171.075 108.765 170.681C108.502 170.286 108.364 169.818 108.371 169.34C108.378 168.862 108.529 168.398 108.803 168.012C109.078 167.625 109.462 167.334 109.903 167.18L138.982 156.998C139.452 156.835 139.961 156.832 140.432 156.991L172.886 168.064C173.334 168.217 173.725 168.51 174.002 168.901C174.28 169.293 174.432 169.763 174.435 170.247C174.439 170.73 174.295 171.203 174.023 171.599C173.751 171.994 173.365 172.293 172.919 172.453L142.291 183.441C142.05 183.527 141.797 183.571 141.542 183.57V183.57Z"
							fill="#084711"
						/>
						<path
							id="Vector_16"
							d="M113.426 182.743H112.52V169.293H140.161V170.22H113.426V182.743Z"
							fill="#3F3D56"
						/>
						<path
							id="Vector_17"
							d="M112.972 185.526C113.973 185.526 114.785 184.696 114.785 183.671C114.785 182.646 113.973 181.816 112.972 181.816C111.971 181.816 111.16 182.646 111.16 183.671C111.16 184.696 111.971 185.526 112.972 185.526Z"
							fill="#3F3D56"
						/>
						<path
							id="Vector_18"
							d="M368.479 264.088C390.035 264.088 407.51 246.202 407.51 224.138C407.51 202.073 390.035 184.187 368.479 184.187C346.922 184.187 329.447 202.073 329.447 224.138C329.447 246.202 346.922 264.088 368.479 264.088Z"
							fill="#2F2E41"
						/>
						<path
							id="Vector_19"
							d="M362.55 255.491H350.692V277.236H362.55V255.491Z"
							fill="#2F2E41"
						/>
						<path
							id="Vector_20"
							d="M386.265 255.491H374.408V277.236H386.265V255.491Z"
							fill="#2F2E41"
						/>
						<path
							id="Vector_21"
							d="M360.574 281.282C366.031 281.282 370.455 279.584 370.455 277.489C370.455 275.395 366.031 273.697 360.574 273.697C355.116 273.697 350.692 275.395 350.692 277.489C350.692 279.584 355.116 281.282 360.574 281.282Z"
							fill="#2F2E41"
						/>
						<path
							id="Vector_22"
							d="M384.289 280.776C389.746 280.776 394.17 279.078 394.17 276.984C394.17 274.889 389.746 273.191 384.289 273.191C378.832 273.191 374.408 274.889 374.408 276.984C374.408 279.078 378.832 280.776 384.289 280.776Z"
							fill="#2F2E41"
						/>
						<path
							id="Vector_23"
							d="M410.539 206.68C418.992 198.021 423.692 188.8 421.036 186.084C418.38 183.368 409.375 188.185 400.922 196.844C392.469 205.503 387.77 214.724 390.425 217.44C393.081 220.156 402.086 215.339 410.539 206.68Z"
							fill="#2F2E41"
						/>
						<path
							id="Vector_24"
							d="M333.64 243.763C340.461 233.709 343.491 223.782 340.407 221.59C337.323 219.398 329.294 225.772 322.473 235.826C315.652 245.881 312.623 255.808 315.707 258C318.79 260.192 326.82 253.818 333.64 243.763Z"
							fill="#2F2E41"
						/>
						<path
							id="Vector_25"
							d="M366.836 232.13C374.204 232.13 380.176 226.017 380.176 218.476C380.176 210.935 374.204 204.822 366.836 204.822C359.469 204.822 353.497 210.935 353.497 218.476C353.497 226.017 359.469 232.13 366.836 232.13Z"
							fill="white"
						/>
						<path
							id="Vector_26"
							d="M371.368 218.389C373.824 218.389 375.815 216.351 375.815 213.838C375.815 211.324 373.824 209.286 371.368 209.286C368.912 209.286 366.921 211.324 366.921 213.838C366.921 216.351 368.912 218.389 371.368 218.389Z"
							fill="#3F3D56"
						/>
						<path
							id="Vector_27"
							d="M382.83 243.729C384.139 248.553 379.372 253.177 372.183 254.055C364.995 254.933 358.106 251.734 356.798 246.909L356.793 246.892C355.491 242.066 361.05 240.359 368.24 239.485C375.43 238.612 381.528 238.903 382.83 243.729Z"
							fill="white"
						/>
						<path
							id="Vector_28"
							d="M354.822 200.625C348.385 203.266 341.595 204.899 334.682 205.467C334.2 205.502 333.72 205.379 333.309 205.118C332.899 204.856 332.58 204.468 332.398 204.01L326.471 188.922C326.248 188.352 326.255 187.714 326.49 187.148C326.726 186.582 327.171 186.136 327.728 185.906L364.726 170.679C365.284 170.45 365.907 170.457 366.46 170.698C367.012 170.939 367.449 171.395 367.673 171.965L373.597 187.044C373.779 187.507 373.811 188.017 373.688 188.5C373.564 188.983 373.293 189.412 372.913 189.725C367.437 194.246 361.341 197.919 354.822 200.625V200.625Z"
							fill="#084711"
						/>
						<path
							id="Vector_29"
							opacity="0.2"
							d="M367.253 172.138L368.244 174.66L351.046 190.086C350.724 190.372 350.314 190.534 349.887 190.543L327.801 191.064L326.892 188.749C326.714 188.293 326.72 187.783 326.908 187.33C327.097 186.878 327.452 186.521 327.897 186.336L364.895 171.109C365.341 170.927 365.84 170.933 366.282 171.126C366.724 171.319 367.073 171.682 367.253 172.138V172.138Z"
							fill="black"
						/>
						<path
							id="Vector_30"
							d="M349.34 187.4C349.088 187.504 348.82 187.561 348.548 187.568L315.544 188.349C315.078 188.36 314.619 188.223 314.231 187.957C313.843 187.691 313.545 187.309 313.377 186.863C313.21 186.417 313.181 185.929 313.294 185.466C313.408 185.003 313.658 184.586 314.012 184.274L337.28 163.723C337.656 163.393 338.127 163.197 338.622 163.164L372.769 161.045C373.241 161.016 373.71 161.138 374.11 161.395C374.511 161.652 374.823 162.031 375.002 162.478C375.182 162.926 375.22 163.419 375.112 163.89C375.004 164.361 374.755 164.785 374.4 165.104L349.988 186.994C349.796 187.166 349.577 187.303 349.34 187.4V187.4Z"
							fill="#084711"
						/>
						<path
							id="Vector_31"
							d="M322.952 197.369L322.111 197.715L317.209 185.236L342.855 174.68L343.193 175.541L318.387 185.751L322.952 197.369Z"
							fill="#3F3D56"
						/>
						<path
							id="Vector_32"
							d="M322.87 200.258C323.871 200.258 324.682 199.428 324.682 198.403C324.682 197.378 323.871 196.548 322.87 196.548C321.869 196.548 321.057 197.378 321.057 198.403C321.057 199.428 321.869 200.258 322.87 200.258Z"
							fill="#3F3D56"
						/>
						<g id="Hat">
							<path
								id="Vector_33"
								d="M517.071 129.747C511.188 125.989 505.892 121.344 501.362 115.969C501.05 115.591 500.863 115.122 500.827 114.629C500.791 114.135 500.909 113.643 501.163 113.222L509.56 99.4173C509.878 98.8957 510.385 98.5246 510.97 98.3853C511.555 98.246 512.171 98.35 512.681 98.6743L546.532 120.247C547.042 120.573 547.404 121.092 547.541 121.691C547.677 122.29 547.575 122.919 547.258 123.442L538.866 137.238C538.608 137.662 538.225 137.99 537.771 138.173C537.318 138.356 536.819 138.385 536.348 138.256C529.55 136.402 523.055 133.535 517.071 129.747V129.747Z"
								fill="#084711"
							/>
							<path
								id="Vector_34"
								opacity="0.2"
								d="M546.874 123.196L545.47 125.504L523.152 120.405C522.736 120.308 522.367 120.065 522.108 119.718L508.656 101.78L509.945 99.6622C510.2 99.2456 510.606 98.9493 511.073 98.8379C511.541 98.7266 512.033 98.8092 512.442 99.0679L546.293 120.641C546.7 120.902 546.99 121.317 547.098 121.796C547.207 122.275 547.126 122.778 546.874 123.196V123.196Z"
								fill="black"
							/>
							<path
								id="Vector_35"
								d="M524.262 117.41C524.031 117.263 523.828 117.075 523.662 116.855L503.56 90.0517C503.276 89.6727 503.113 89.2131 503.094 88.7357C503.074 88.2584 503.2 87.7866 503.452 87.3848C503.705 86.983 504.072 86.6708 504.505 86.491C504.937 86.3111 505.413 86.2723 505.868 86.3799L535.811 93.4675C536.294 93.5834 536.727 93.8567 537.045 94.2464L558.878 121.204C559.179 121.576 559.359 122.036 559.393 122.518C559.427 123.001 559.312 123.482 559.066 123.894C558.819 124.307 558.453 124.63 558.017 124.819C557.582 125.008 557.101 125.053 556.639 124.947L524.965 117.705C524.717 117.648 524.479 117.548 524.262 117.41Z"
								fill="#084711"
							/>
							<path
								id="Vector_36"
								d="M500.821 101.498L500.052 101.007L506.998 89.5889L530.463 104.543L529.984 105.33L507.288 90.8662L500.821 101.498Z"
								fill="#3F3D56"
							/>
						</g>
						<path
							id="Vector_37"
							d="M499.958 103.895C500.959 103.895 501.77 103.064 501.77 102.04C501.77 101.015 500.959 100.185 499.958 100.185C498.957 100.185 498.145 101.015 498.145 102.04C498.145 103.064 498.957 103.895 499.958 103.895Z"
							fill="#3F3D56"
						/>
						<path
							id="Vector_38"
							d="M611.498 218.634C633.054 218.634 650.529 200.748 650.529 178.684C650.529 156.619 633.054 138.733 611.498 138.733C589.941 138.733 572.466 156.619 572.466 178.684C572.466 200.748 589.941 218.634 611.498 218.634Z"
							fill="#2F2E41"
						/>
						<path
							id="Vector_39"
							d="M638.557 199.398L628.439 205.728L639.518 224.282L649.635 217.953L638.557 199.398Z"
							fill="#2F2E41"
						/>
						<path
							id="Vector_40"
							d="M618.321 212.056L608.204 218.385L619.282 236.94L629.4 230.611L618.321 212.056Z"
							fill="#2F2E41"
						/>
						<path
							id="Vector_41"
							d="M643.265 226.679C647.921 223.766 650.831 219.956 649.764 218.169C648.697 216.381 644.057 217.294 639.4 220.207C634.744 223.12 631.834 226.93 632.901 228.717C633.968 230.505 638.608 229.592 643.265 226.679Z"
							fill="#2F2E41"
						/>
						<path
							id="Vector_42"
							d="M622.772 238.906C627.428 235.993 630.338 232.183 629.271 230.395C628.204 228.608 623.564 229.52 618.907 232.433C614.25 235.346 611.341 239.156 612.408 240.944C613.475 242.731 618.115 241.819 622.772 238.906Z"
							fill="#2F2E41"
						/>
						<path
							id="Vector_43"
							d="M589.552 171.986C592.207 169.27 587.508 160.049 579.055 151.39C570.602 142.731 561.597 137.914 558.941 140.63C556.285 143.346 560.985 152.567 569.438 161.226C577.891 169.885 586.896 174.702 589.552 171.986Z"
							fill="#2F2E41"
						/>
						<path
							id="Vector_44"
							d="M664.27 212.546C667.354 210.354 664.324 200.427 657.504 190.373C650.683 180.318 642.654 173.944 639.57 176.136C636.486 178.328 639.516 188.255 646.336 198.309C653.157 208.364 661.186 214.738 664.27 212.546Z"
							fill="#2F2E41"
						/>
						<path
							id="Vector_45"
							d="M599.546 181.11C606.913 181.11 612.886 174.997 612.886 167.456C612.886 159.915 606.913 153.802 599.546 153.802C592.179 153.802 586.206 159.915 586.206 167.456C586.206 174.997 592.179 181.11 599.546 181.11Z"
							fill="white"
						/>
						<path
							id="Vector_46"
							d="M595.014 167.369C597.47 167.369 599.461 165.332 599.461 162.818C599.461 160.304 597.47 158.267 595.014 158.267C592.559 158.267 590.568 160.304 590.568 162.818C590.568 165.332 592.559 167.369 595.014 167.369Z"
							fill="#3F3D56"
						/>
						<path
							id="Vector_47"
							d="M582.368 190.233C579.838 194.475 583.208 200.214 589.896 203.051C596.583 205.888 604.054 204.749 606.584 200.507L606.593 200.492C609.116 196.247 604.215 193.071 597.526 190.238C590.836 187.405 584.891 185.988 582.368 190.233Z"
							fill="white"
						/>
						<path
							id="Vector_48"
							d="M598.402 128.521C601.887 114.155 617.271 105.7 632.763 109.638C648.256 113.575 657.989 128.413 654.504 142.779C651.019 157.146 639.456 157.192 623.964 153.255C608.471 149.317 594.916 142.887 598.402 128.521Z"
							fill="#E6E6E6"
						/>
						<path
							id="Vector_49"
							d="M734.094 282H0.906289C0.665926 282 0.435407 281.902 0.265445 281.728C0.095483 281.554 0 281.318 0 281.072C0 280.826 0.095483 280.59 0.265445 280.416C0.435407 280.243 0.665926 280.145 0.906289 280.145H734.094C734.334 280.145 734.565 280.243 734.735 280.416C734.904 280.59 735 280.826 735 281.072C735 281.318 734.904 281.554 734.735 281.728C734.565 281.902 734.334 282 734.094 282Z"
							fill="#CBCBCB"
						/>
					</g>
				</svg>
			</div>
		</section>
	);
};

export default LandingPage;
