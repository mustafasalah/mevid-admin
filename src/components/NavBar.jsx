import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = (props) => {
	return (
		<nav>
			<ul>
				<li>
					<NavLink to="/dashboard" className="radius">
						<i className="fas fa-chart-area"></i> Dashboard
					</NavLink>
				</li>
				<li>
					<NavLink to="/shows" className="radius">
						<i className="fas fa-film"></i> Shows
					</NavLink>

					<ul className="sub-menu blur-shadow radius">
						<li>
							<NavLink exact to="/shows">
								All Shows
							</NavLink>
						</li>
						<li>
							<NavLink to="/shows/movies">Movies</NavLink>
						</li>
						<li>
							<NavLink to="/shows/anime">Anime</NavLink>
						</li>
						<li>
							<NavLink to="/shows/tv-shows">TV Shows</NavLink>
						</li>
					</ul>
				</li>

				<li>
					<NavLink to="/episodes" className="radius">
						<i className="fas fa-film"></i> Episodes
					</NavLink>

					<ul className="sub-menu blur-shadow radius">
						<li>
							<NavLink exact to="/episodes">
								All Episodes
							</NavLink>
						</li>

						<li>
							<NavLink to="/episodes/add">Add Episode</NavLink>
						</li>
					</ul>
				</li>

				<li>
					<NavLink to="/comments" className="radius">
						<i className="fas fa-comments"></i> Comments
					</NavLink>
				</li>
				<li>
					<NavLink to="/reviews" className="radius">
						<i className="fas fa-star-half-alt"></i> Reviews
					</NavLink>
				</li>
				<li>
					<NavLink to="/scheduler" className="radius">
						<i className="fas fa-calendar-alt"></i> Scheduler
					</NavLink>
				</li>
				<li>
					<NavLink to="/users" className="radius">
						<i className="fas fa-users"></i> Users
					</NavLink>

					<ul className="sub-menu blur-shadow radius">
						<li>
							<NavLink exact to="/users">
								All Users
							</NavLink>
						</li>

						<li>
							<NavLink to="/users/new">Add User</NavLink>
						</li>
					</ul>
				</li>
				<li>
					<NavLink to="/pages" className="radius">
						<i className="fas fa-copy"></i> Pages
					</NavLink>

					<ul className="sub-menu blur-shadow radius">
						<li>
							<NavLink exact to="/pages">
								All Pages
							</NavLink>
						</li>

						<li>
							<NavLink to="/pages/new">Create Page</NavLink>
						</li>
					</ul>
				</li>
				<li>
					<NavLink to="/layout" className="radius">
						<i className="fas fa-brush"></i> Layout and View
					</NavLink>

					<ul className="sub-menu blur-shadow radius">
						<li>
							<NavLink exact to="/layout">
								Site Layout
							</NavLink>
						</li>

						<li>
							<NavLink to="/layout/main-menu">
								Menu Layout
							</NavLink>
						</li>
					</ul>
				</li>
				<li>
					<NavLink to="/settings" className="radius">
						<i className="fas fa-cogs"></i> General Settings
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;
