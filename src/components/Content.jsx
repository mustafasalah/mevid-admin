import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Dashboard from "./content/Dashboard";
import Shows from "./content/Shows";
import Comments from "./content/Comments";
import Reviews from "./content/Reviews";
import Pages from "./content/Pages";
import Page from "./content/Page";
import Scheduler from "./content/Scheduler";
import Users from "./content/Users";
import User from "./content/User";
import Layout from "./content/Layout";
import MainMenu from "./content/MainMenu";
import Settings from "./content/Settings";
import Episodes from "./content/Episodes";
import Episode from "./content/Episode";
import Movies from "./content/Movies";
import Animes from "./content/Animes";
import TVShows from "./content/TVShows";
import ShowForm from "./content/ShowForm";

const Content = () => {
	return (
		<section id="content-section">
			<Switch>
				<Route path="/episodes/:id" component={Episode} />
				<Route path="/episodes/add" component={Episode} />
				<Route path="/episodes" component={Episodes} />

				<Route path="/layout/main-menu" component={MainMenu} />
				<Route path="/layout" component={Layout} />
				<Route path="/settings" component={Settings} />

				<Route path="/users/new" component={User} />
				<Route path="/users/:id" component={User} />
				<Route path="/users" component={Users} />

				<Route path="/scheduler" component={Scheduler} />

				<Route path="/pages/edit/:id" component={Page} />
				<Route path="/pages/new" component={Page} />
				<Route path="/pages" component={Pages} />

				<Route path="/reviews" component={Reviews} />
				<Route path="/comments" component={Comments} />

				<Route path="/shows/:type/add" component={ShowForm} />
				<Route path="/shows/:type/:id" component={ShowForm} />

				<Route path="/shows/tv-shows" component={TVShows} />
				<Route path="/shows/anime" component={Animes} />
				<Route path="/shows/movies" component={Movies} />
				<Route path="/shows" component={Shows} />

				<Route path={"/dashboard"} component={Dashboard} />

				<Redirect from="/tv-shows" to="/shows/tv-shows" />
				<Redirect from="/anime" to="/shows/anime" />
				<Redirect from="/movies" to="/shows/movies" />

				<Redirect to="/dashboard" />
			</Switch>
		</section>
	);
};

export default Content;
