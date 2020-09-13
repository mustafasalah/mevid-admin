import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Dashboard from "./content/Dashboard";
import Shows from "./content/Shows";
import Comments from "./content/Comments";
import Reviews from "./content/Reviews";
import Reports from "./content/Reports";
import Pages from "./content/Pages";
import Page from "./content/Page";
import Scheduler from "./content/Scheduler";
import Users from "./content/Users";
import UserForm from "./content/UserForm";
import Layout from "./content/Layout";
import MainMenu from "./content/MainMenu";
import Settings from "./content/Settings";
import Episodes from "./content/Episodes";
import Movies from "./content/Movies";
import Animes from "./content/Animes";
import TVShows from "./content/TVShows";
import ShowForm from "./content/ShowForm";
import EpisodeForm from "./content/EpisodeForm";

const Content = () => {
	return (
		<section id="content-section">
			<Switch>
				<Route path="/episodes/add" component={EpisodeForm} />
				<Route path="/episodes/:id" component={EpisodeForm} />
				<Route path="/episodes" component={Episodes} />

				<Route path="/layout/main-menu" component={MainMenu} />
				<Route path="/layout" component={Layout} />
				<Route path="/settings" component={Settings} />

				<Route path="/users/new" component={UserForm} />
				<Route path="/users/:id" component={UserForm} />
				<Route path="/users" component={Users} />

				<Route path="/scheduler" component={Scheduler} />

				<Route path="/pages/new" component={Page} />
				<Route path="/pages/:id" component={Page} />
				<Route path="/pages" component={Pages} exact />

				<Route path="/comments" component={Comments} />
				<Route path="/reports" component={Reports} />
				<Route path="/reviews" component={Reviews} />

				<Route path="/shows/tv-shows" component={TVShows} exact />
				<Route path="/shows/anime" component={Animes} exact />
				<Route path="/shows/movies" component={Movies} exact />
				<Route path="/shows/:type/add" component={ShowForm} />
				<Route path="/shows/:id" component={ShowForm} />
				<Route path="/shows" component={Shows} />

				<Route path="/dashboard" component={Dashboard} />

				<Redirect from="/tv-shows" to="/shows/tv-shows" />
				<Redirect from="/anime" to="/shows/anime" />
				<Redirect from="/movies" to="/shows/movies" />
				<Redirect from="/" to="/dashboard" />
			</Switch>
		</section>
	);
};

export default Content;
