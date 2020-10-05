import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import renderChartJS from "../../js/viewsChart";
import SectionHeader from "./../common/SectionHeader";
import StatisticWidget from "./StatisticWidget";
import { connect } from "react-redux";
import RecentWidget from "./RecentWidget";
import getDataActions from "./../../actions/DataActions";

class Dashboard extends React.Component {
	componentDidMount() {
		renderChartJS();
	}

	getShowsByCategory() {
		let movies = [],
			anime = [],
			tvshows = [];

		this.props.shows.forEach((show) => {
			switch (show.category) {
				case "movie":
					movies.push(show);
					break;

				case "tvshow":
					tvshows.push(show);
					break;

				case "anime":
					anime.push(anime);
					break;

				default:
			}
		});

		return { movies, anime, tvshows };
	}

	getItemsByStatus(items) {
		let approvedItems = [],
			unapprovedItems = [];

		items.forEach((item) => {
			if (item.status === "approved") {
				approvedItems.push(item);
			} else {
				unapprovedItems.push(item);
			}
		});

		return { approvedItems, unapprovedItems };
	}

	getUsersByStatus() {
		let activeUsers = [],
			bannedUsers = [];
		this.props.users.forEach((user) => {
			if (user.status === "active") {
				activeUsers.push(user);
			} else {
				bannedUsers.push(user);
			}
		});

		return { activeUsers, bannedUsers };
	}

	render() {
		const {
			shows,
			reviews,
			comments,
			users,
			reports,
			fixReportAction,
			changeCommentStatus,
			changeReviewStatus,
		} = this.props;
		const { movies, anime, tvshows } = this.getShowsByCategory();
		const {
			approvedItems: approvedReviews,
			unapprovedItems: unapprovedReviews,
		} = this.getItemsByStatus(reviews);
		const {
			approvedItems: approvedComments,
			unapprovedItems: unapprovedComments,
		} = this.getItemsByStatus(comments);
		const { activeUsers, bannedUsers } = this.getUsersByStatus();

		return (
			<Fragment>
				<SectionHeader name="Overview" faClass="fas fa-chart-pie" />

				<div id="statistics-container">
					<StatisticWidget
						title="Shows"
						data={[
							{ label: "Movies", counter: movies.length },
							{ label: "Anime", counter: anime.length },
							{ label: "TV Shows", counter: tvshows.length },
						]}
						moreLink="/shows"
						faClass="fas fa-film"
					/>

					<StatisticWidget
						title="Comments"
						data={[
							{
								label: "Approved",
								counter: approvedComments.length,
							},
							{
								label: "Unapproved",
								counter: unapprovedComments.length,
							},
						]}
						moreLink="/comments"
						faClass="fas fa-comments"
					/>

					<StatisticWidget
						title="Reviews"
						data={[
							{
								label: "Approved",
								counter: approvedReviews.length,
							},
							{
								label: "Unapproved",
								counter: unapprovedReviews.length,
							},
						]}
						moreLink="/reviews"
						faClass="fas fa-star-half-alt"
					/>

					<StatisticWidget
						title="Users"
						data={[
							{
								label: "Active User",
								counter: activeUsers.length,
							},
							{
								label: "Banned User",
								counter: bannedUsers.length,
							},
						]}
						moreLink="/users"
						faClass="fas fa-user"
					/>
				</div>

				<div id="main-side">
					<section className="widget" id="views-diagram">
						<header>
							<h3>
								<span>
									<i className="fas fa-chart-line"></i> Views
									Diagram
								</span>
							</h3>

							<select
								className="widget-options radius-3"
								id="diagram-control"
							>
								<option value="today">Today</option>
								<option value="week" selected>
									This Week
								</option>
								<option value="month">This Month</option>
								<option value="year">This Year</option>
							</select>
						</header>
						<div className="widget-content radius blur-shadow">
							<canvas id="myChart"></canvas>
							<script src="./assets/js/viewsChart.js"></script>
						</div>
					</section>

					<section className="widget" id="day-shows">
						<h3>
							<span>
								<i className="fas fa-calendar-day"></i>
								Today's Shows
							</span>
						</h3>
						<div className="widget-content radius blur-shadow">
							<ul>
								<li>
									<div className="show-poster">
										<Link
											to="#"
											className="focus-shadow radius"
											title="Re:Zero kara Hajimeru Isekai Seikatsu"
											style={{}}
										></Link>
									</div>
									<div className="show-info">
										<dl>
											<dt>Show Name:</dt>
											<dd>
												<Link to="#">
													Re:Zero kara Hajimeru Isekai
													Seikatsu - Episode 16
												</Link>
											</dd>

											<dt>Show Time:</dt>
											<dd>
												<time dateTime="12:30">
													12:30 GMT
												</time>
											</dd>
										</dl>
										<button
											className="do-btn radius-3"
											disabled
										>
											Added
										</button>
									</div>
								</li>
								<li>
									<div className="show-poster">
										<Link
											to="#"
											className="focus-shadow radius"
											title="Hunter X Hunter"
											style={{}}
										></Link>
									</div>
									<div className="show-info">
										<dl>
											<dt>Show Name:</dt>
											<dd>
												<Link to="#">
													Hunter X Hunter - Episode
													124
												</Link>
											</dd>

											<dt>Show Time:</dt>
											<dd>
												<time dateTime="22:30">
													22:30 GMT
												</time>
											</dd>
										</dl>
										<button className="do-btn radius-3 focus-shadow">
											Add
										</button>
									</div>
								</li>
								<li className="gray">
									<div className="show-poster">
										<Link
											to="#"
											className="focus-shadow radius"
											title="Overlord III"
											style={{}}
										></Link>
									</div>
									<div className="show-info">
										<dl>
											<dt>Show Name:</dt>
											<dd>
												<Link to="#">
													Overlord III - Episode 11
												</Link>
											</dd>

											<dt>Show Time:</dt>
											<dd>
												<time dateTime="02:00">
													02:00 GMT
												</time>
											</dd>
										</dl>
										<button className="do-btn radius-3 focus-shadow">
											Add
										</button>
									</div>
								</li>
								<li className="gray">
									<div className="show-poster">
										<Link
											to="#"
											className="focus-shadow radius"
											title="The Promisted Neverland"
											style={{}}
										></Link>
									</div>
									<div className="show-info">
										<dl>
											<dt>Show Name:</dt>
											<dd>
												<Link to="#">
													The Promisted Neverland -
													Episode 10
												</Link>
											</dd>

											<dt>Show Time:</dt>
											<dd>
												<time dateTime="17:00">
													17:00 GMT
												</time>
											</dd>
										</dl>
										<button className="do-btn radius-3 focus-shadow">
											Add
										</button>
									</div>
								</li>
							</ul>
						</div>
					</section>

					<div id="top-lists-widgets">
						<section className="widget list" id="top-shows">
							<header>
								<h3>
									<span>
										<i className="fas fa-star"></i> Top
										Shows
									</span>
								</h3>
								<select className="widget-options radius-3">
									<option value="week" selected>
										This Week
									</option>
									<option value="month">This Month</option>
									<option value="all">All Time</option>
								</select>
							</header>
							<div className="widget-content blur-shadow radius">
								<ul>
									<li>
										<div className="item-image">
											<Link
												to="#"
												style={{}}
												className="radius focus-shadow"
											></Link>
										</div>
										<div className="item-info">
											<h4>
												<Link to="#">
													Spider-Man: Into the
													Spider-Verse
												</Link>
											</h4>
											<p>
												<span className="views">
													Views: 4503
												</span>
											</p>
										</div>
									</li>
									<li>
										<div className="item-image">
											<Link
												to="#"
												style={{}}
												className="radius focus-shadow"
											></Link>
										</div>
										<div className="item-info">
											<h4>
												<Link to="#">
													Re:Zero kara Hajimeru Isekai
													Seikatsu
												</Link>
											</h4>
											<p>
												<span className="views">
													Views: 4104
												</span>
											</p>
										</div>
									</li>
									<li>
										<div className="item-image">
											<Link
												to="#"
												style={{}}
												className="radius focus-shadow"
											></Link>
										</div>
										<div className="item-info">
											<h4>
												<Link to="#">
													Hunter X Hunter
												</Link>
											</h4>
											<p>
												<span className="views">
													Views: 3788
												</span>
											</p>
										</div>
									</li>
									<li>
										<div className="item-image">
											<Link
												to="#"
												style={{}}
												className="radius focus-shadow"
											></Link>
										</div>
										<div className="item-info">
											<h4>
												<Link to="#">
													Game of Thrones Season 8
												</Link>
											</h4>
											<p>
												<span className="views">
													Views: 3241
												</span>
											</p>
										</div>
									</li>
									<li>
										<div className="item-image">
											<Link
												to="#"
												style={{}}
												className="radius focus-shadow"
											></Link>
										</div>
										<div className="item-info">
											<h4>
												<Link to="#">
													How To Train Your Dragon:
													The Hidden World
												</Link>
											</h4>
											<p>
												<span className="views">
													Views: 2895
												</span>
											</p>
										</div>
									</li>
								</ul>
							</div>
						</section>

						<section className="widget list" id="top-authors">
							<header>
								<h3>
									<span>
										<i className="fas fa-crown"></i> Top
										Authors
									</span>
								</h3>
								<select className="widget-options radius-3">
									<option value="week" selected>
										This Week
									</option>
									<option value="month">This Month</option>
									<option value="all">All Time</option>
								</select>
							</header>
							<div className="widget-content blur-shadow radius">
								<ul>
									<li>
										<div className="item-image">
											<Link
												to="#"
												style={{}}
												className="focus-shadow"
											></Link>
										</div>
										<div className="item-info">
											<h4>
												<Link to="#">
													Mustafa Salah
												</Link>
											</h4>
											<p>
												<span>Adminstrator</span>
											</p>
										</div>
										<div className="author-statistics">
											<span className="statistic">
												<strong>18</strong>
												<span>Movie</span>
											</span>
											<span className="statistic">
												<strong>23</strong>
												<span>Episode</span>
											</span>
										</div>
									</li>
									<li>
										<div className="item-image">
											<Link
												to="#"
												style={{}}
												className="focus-shadow"
											></Link>
										</div>
										<div className="item-info">
											<h4>
												<Link to="#">Levia Sama</Link>
											</h4>
											<p>
												<span>Supervisor</span>
											</p>
										</div>
										<div className="author-statistics">
											<span className="statistic">
												<strong>13</strong>
												<span>Movie</span>
											</span>
											<span className="statistic">
												<strong>20</strong>
												<span>Episode</span>
											</span>
										</div>
									</li>
									<li>
										<div className="item-image">
											<Link
												to="#"
												style={{}}
												className="focus-shadow"
											></Link>
										</div>
										<div className="item-info">
											<h4>
												<Link to="#">Ali Osman</Link>
											</h4>
											<p>
												<span>Supervisor</span>
											</p>
										</div>
										<div className="author-statistics">
											<span className="statistic">
												<strong>10</strong>
												<span>Movie</span>
											</span>
											<span className="statistic">
												<strong>14</strong>
												<span>Episode</span>
											</span>
										</div>
									</li>
									<li>
										<div className="item-image">
											<Link
												to="#"
												style={{}}
												className="focus-shadow"
											></Link>
										</div>
										<div className="item-info">
											<h4>
												<Link to="#">Dororo San</Link>
											</h4>
											<p>
												<span>Supervisor</span>
											</p>
										</div>
										<div className="author-statistics">
											<span className="statistic">
												<strong>0</strong>
												<span>Movie</span>
											</span>
											<span className="statistic">
												<strong>22</strong>
												<span>Episode</span>
											</span>
										</div>
									</li>
									<li>
										<div className="item-image">
											<Link
												to="#"
												style={{}}
												className="focus-shadow"
											></Link>
										</div>
										<div className="item-info">
											<h4>
												<Link to="#">Lazy Man</Link>
											</h4>
											<p>
												<span>Supervisor</span>
											</p>
										</div>
										<div className="author-statistics">
											<span className="statistic">
												<strong>07</strong>
												<span>Movie</span>
											</span>
											<span className="statistic">
												<strong>03</strong>
												<span>Episode</span>
											</span>
										</div>
									</li>
								</ul>
							</div>
						</section>
					</div>
				</div>
				<div id="end-side">
					<RecentWidget
						title="Reports"
						faClass="fas fa-exclamation-circle"
						onPhrase="Report on"
						doBtnLabel="Fixed?"
						showMoreLink="/reports"
						data={reports}
						doBtnAction={(id) => {
							const isDelete = window.confirm(
								"Are you sure you fixed this report?"
							);
							isDelete && fixReportAction(id);
						}}
					/>

					<RecentWidget
						title="Comments"
						faClass="fas fa-comments"
						onPhrase="Commented on"
						doBtnLabel="Approve?"
						showMoreLink="/comments"
						data={comments}
						doBtnCondition={(item) => item.status !== "approved"}
						doBtnAction={(id) => {
							changeCommentStatus([id], "approve");
						}}
					/>

					<RecentWidget
						title="Reviews"
						faClass="fas fa-star-half-alt"
						onPhrase="Reviewed"
						doBtnLabel="Approve?"
						showMoreLink="/reviews"
						data={reviews}
						doBtnCondition={(item) => item.status !== "approved"}
						doBtnAction={(id) => {
							changeReviewStatus([id], "approve");
						}}
					/>
				</div>
			</Fragment>
		);
	}
}

export default connect((state) => state, {
	fixReportAction: getDataActions("reports").deleteData,
	changeCommentStatus: getDataActions("comments").changeStatus,
	changeReviewStatus: getDataActions("reviews").changeStatus,
})(Dashboard);
