import React from "react";
import { Link } from "react-router-dom";

const AddMenu = ({ active, onClick }) => {
	return (
		<div className="top-bar-btn" id="add-btn" title="Add Shows and Pages">
			<button
				className={active ? "active" : ""}
				onClick={() => {
					onClick(active ? "" : "addMenu");
				}}
			>
				<i className="fas fa-plus"></i>
			</button>
			<ul className="sub-menu blur-shadow">
				<li>
					<Link to="/episodes/add">
						<i className="fas fa-plus"></i> Add Episode
					</Link>
				</li>
				<li>
					<Link to="/shows/movies/add">
						<i className="fas fa-plus"></i> Add Movie
					</Link>
				</li>
				<li>
					<Link to="/shows/anime/add">
						<i className="fas fa-plus"></i> Add Anime
					</Link>
				</li>
				<li>
					<Link to="/shows/tv-shows/add">
						<i className="fas fa-plus"></i> Add TV Show
					</Link>
				</li>
				<li>
					<Link to="/pages/new">
						<i className="fas fa-plus"></i> Create Page
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default AddMenu;
