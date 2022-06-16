import "./DashboardNavLinks.scss";
import React from "react";
import { Link } from "react-router-dom";
import {
	DASHBOARD_LEARNING_PATH,
	DASHBOARD_PATH,
	DASHBOARD_REPORTS_PATH,
	DASHBOARD_STATS_PATH,
	LANDING_PATH,
} from "../../../../Routes/routesPath";

import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { problemClear } from "../../../../Store/features/problemSlice";

const DashboardNavLinks: React.FC = () => {
	const dispatch = useDispatch();
	const componentClass = "wtl-dashboard-nav";
	const upperPartClass = `${componentClass}__upper-part`;
	const logoClass = `${upperPartClass}--logo`;
	const navLinksClass = `${upperPartClass}__nav-links`;
	const navLinkCLass = `${navLinksClass}--link`;
	const lowerPartClass = `${componentClass}__lower-part`;

	return (
		<nav className={componentClass}>
			<div className={upperPartClass}>
				<div className={logoClass}>
					<h1>wtl.</h1>
				</div>
				<ul className={navLinksClass}>
					<NavLink
						end
						to={DASHBOARD_PATH}
						style={({ isActive }) =>
							isActive
								? {
										color: "yellow",
								  }
								: {}
						}
						className={navLinkCLass}
					>
						<i className="fa-solid fa-gauge-high"></i>
						Dashboard
					</NavLink>
					<NavLink
						to={DASHBOARD_LEARNING_PATH}
						style={({ isActive }) =>
							isActive
								? {
										color: "lightskyblue",
								  }
								: {}
						}
						className={navLinkCLass}
					>
						<i className="fa-solid fa-sitemap"></i>
						Learning Paths
					</NavLink>
					<NavLink
						end
						to={DASHBOARD_STATS_PATH}
						style={({ isActive }) =>
							isActive
								? {
										color: "yellowgreen",
								  }
								: {}
						}
						className={navLinkCLass}
					>
						<i className="fa-solid fa-chart-line"></i>
						Statistics
					</NavLink>
					<NavLink
						end
						to={DASHBOARD_REPORTS_PATH}
						style={({ isActive }) =>
							isActive
								? {
										color: "#f51818",
								  }
								: {}
						}
						className={navLinkCLass}
					>
						<i className="fa-solid fa-biohazard"></i>
						Reported Problems
					</NavLink>
				</ul>
			</div>
			<Link
				to={LANDING_PATH}
				className={lowerPartClass}
				onClick={() => {
					dispatch(problemClear());
				}}
			>
				<i className="fa-solid fa-person-running"></i>
				Bye Admin!
			</Link>
		</nav>
	);
};

export default DashboardNavLinks;
