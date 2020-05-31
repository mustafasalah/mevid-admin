import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import renderChartJS from "../../js/viewsChart";
import SectionHeader from "./../common/SectionHeader";

class Dashboard extends React.Component {
	componentDidMount() {
		renderChartJS();
	}

	render() {
		return (
			<Fragment>
				<SectionHeader name="Overview" faClass="fas fa-chart-pie" />

				<div id="statistics-container">
					<div className="statistic shows radius focus-shadow">
						<h3>
							<span>Shows</span>
						</h3>
						<div className="statistic-content">
							<div className="info-side">
								<ul>
									<li>
										<span className="count">14</span> Movie
									</li>
									<li>
										<span className="count">20</span> Anime
									</li>
									<li>
										<span className="count">06</span> TV
										Show
									</li>
									<li>
										<span className="count">40</span> Total
										Shows
									</li>
								</ul>
							</div>
							<div className="icon-details-side">
								<i className="fas fa-film"></i>
								<Link to="#" className="more-detials">
									more detials
								</Link>
							</div>
						</div>
					</div>

					<div className="statistic comments radius focus-shadow">
						<h3>
							<span>Comments</span>
						</h3>
						<div className="statistic-content">
							<div className="info-side">
								<ul>
									<li>
										<span className="count">34</span>{" "}
										Approved
									</li>
									<li>
										<span className="count">20</span>{" "}
										Disapproved
									</li>
									<li>
										<span className="count">54</span> Total
										Comments
									</li>
								</ul>
							</div>
							<div className="icon-details-side">
								<i className="fas fa-comments"></i>
								<Link to="#" className="more-detials">
									more detials
								</Link>
							</div>
						</div>
					</div>

					<div className="statistic reviews radius focus-shadow">
						<h3>
							<span>Reviews</span>
						</h3>
						<div className="statistic-content">
							<div className="info-side">
								<ul>
									<li>
										<span className="count">33</span>{" "}
										Approved
									</li>
									<li>
										<span className="count">09</span>{" "}
										Disapproved
									</li>
									<li>
										<span className="count">42</span> Total
										Reviews
									</li>
								</ul>
							</div>
							<div className="icon-details-side">
								<i className="fas fa-star-half-alt"></i>
								<Link to="#" className="more-detials">
									more detials
								</Link>
							</div>
						</div>
					</div>

					<div className="statistic users radius focus-shadow">
						<h3>
							<span>Users</span>
						</h3>
						<div className="statistic-content">
							<div className="info-side">
								<ul>
									<li>
										<span className="count">222</span>{" "}
										Active User
									</li>
									<li>
										<span className="count">013</span>{" "}
										Banned User
									</li>
									<li>
										<span className="count">235</span> Total
										Users
									</li>
								</ul>
							</div>
							<div className="icon-details-side">
								<i className="fas fa-users"></i>
								<Link to="#" className="more-detials">
									more detials
								</Link>
							</div>
						</div>
					</div>
				</div>

				<div id="main-side">
					<section className="widget" id="views-diagram">
						<header>
							<h3>
								<span>
									<i className="fas fa-chart-line"></i>
									Views Diagram
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
					<section className="widget list">
						<h3>
							<span>
								<i className="fas fa-exclamation-circle"></i>
								Reports
							</span>
						</h3>
						<div className="widget-content blur-shadow radius">
							<ol>
								<li>
									<p className="item-info">
										<i>Report on:</i>
										<time dateTime="2019-07-20T19:10:00">
											02 minute ago
										</time>
									</p>
									<div className="item-content">
										<strong>
											<Link to="#">
												Game Of Thrones Season 8 -
												Episode 05
											</Link>
										</strong>
										<button className="do-btn radius-3 focus-shadow">
											Fixed?
										</button>
									</div>
								</li>
								<li>
									<p className="item-info">
										<i>Report on:</i>
										<time dateTime="2019-07-20T19:10:00">
											50 minute ago
										</time>
									</p>
									<div className="item-content">
										<strong>
											<Link to="#">
												Hunter X Hunter - Episode 22
											</Link>
										</strong>
										<button className="do-btn radius-3 focus-shadow">
											Fixed?
										</button>
									</div>
								</li>
								<li>
									<p className="item-info">
										<i>Report on:</i>
										<time dateTime="2019-07-20T19:10:00">
											02 day ago
										</time>
									</p>
									<div className="item-content">
										<strong>
											<Link to="#">
												Death Parade - Episode 22
											</Link>
										</strong>
										<button className="do-btn radius-3 focus-shadow">
											Fixed?
										</button>
									</div>
								</li>
								<li>
									<p className="item-info">
										<i>Report on:</i>
										<time dateTime="2019-07-20T19:10:00">
											03 day ago
										</time>
									</p>
									<div className="item-content">
										<strong>
											<Link to="#">Pet Sematary</Link>
										</strong>
										<button className="do-btn radius-3 focus-shadow">
											Fixed?
										</button>
									</div>
								</li>
							</ol>
						</div>
					</section>

					<section className="widget list">
						<h3>
							<span>
								<i className="fas fa-comments"></i>
								Recent Comments
							</span>
						</h3>
						<div className="widget-content blur-shadow radius">
							<ol>
								<li>
									<p className="item-info">
										<span>
											<Link to="#">mustafa salah</Link>
											<i>Comment on:</i>
										</span>
										<time dateTime="2019-07-20T19:10:00">
											02 minute ago
										</time>
									</p>
									<div className="item-content">
										<strong>
											<Link to="#">
												Game Of Thrones Season 8 -
												Episode 05
											</Link>
										</strong>
										<button className="do-btn radius-3 focus-shadow">
											Approve?
										</button>
									</div>
								</li>
								<li>
									<p className="item-info">
										<span>
											<Link to="#">mustafa salah</Link>
											<i>Comment on:</i>
										</span>
										<time dateTime="2019-07-20T19:10:00">
											50 minute ago
										</time>
									</p>
									<div className="item-content">
										<strong>
											<Link to="#">
												Hunter X Hunter - Episode 22
											</Link>
										</strong>
										<button className="do-btn radius-3 focus-shadow">
											Approve?
										</button>
									</div>
								</li>
								<li>
									<p className="item-info">
										<span>
											<Link to="#">me_chan</Link>
											<i>Comment on:</i>
										</span>
										<time dateTime="2019-07-20T19:10:00">
											50 minute ago
										</time>
									</p>
									<div className="item-content">
										<strong>
											<Link to="#">
												Re:Zero kara Hajimeru Isekai
												Seikatsu - Episode 11
											</Link>
										</strong>
										<button className="do-btn radius-3 focus-shadow">
											Approve?
										</button>
									</div>
								</li>
								<li>
									<p className="item-info">
										<span>
											<Link to="#">ali osman</Link>
											<i>Comment on:</i>
										</span>
										<time dateTime="2019-07-20T19:10:00">
											02 day ago
										</time>
									</p>
									<div className="item-content">
										<strong>
											<Link to="#">
												Death Parade - Episode 22
											</Link>
										</strong>
									</div>
								</li>
								<li>
									<p className="item-info">
										<span>
											<Link to="#">Me Chan</Link>
											<i>Comment on:</i>
										</span>
										<time dateTime="2019-07-20T19:10:00">
											05 day ago
										</time>
									</p>
									<div className="item-content">
										<strong>
											<Link to="#">
												Overlord III - Episode 11
											</Link>
										</strong>
									</div>
								</li>
								<li className="show-more">
									<Link to="#">Show More</Link>
								</li>
							</ol>
						</div>
					</section>

					<section className="widget list">
						<h3>
							<span>
								<i className="fas fa-star-half-alt"></i>
								Recent Reviews
							</span>
						</h3>
						<div className="widget-content blur-shadow radius">
							<ol>
								<li>
									<p className="item-info">
										<span>
											<Link to="#">mustafa salah</Link>
											<i>Reviews:</i>
										</span>
										<time dateTime="2019-07-20T19:10:00">
											02 minute ago
										</time>
									</p>
									<div className="item-content">
										<strong>
											<Link to="#">
												Game Of Thrones Season 8
											</Link>
										</strong>
										<button className="do-btn radius-3 focus-shadow">
											Approve?
										</button>
									</div>
								</li>
								<li>
									<p className="item-info">
										<span>
											<Link to="#">hero</Link>
											<i>Reviews:</i>
										</span>
										<time dateTime="2019-07-20T19:10:00">
											05 minute ago
										</time>
									</p>
									<div className="item-content">
										<strong>
											<Link to="#">
												How to train your dragon: the
												hidden world
											</Link>
										</strong>
										<button className="do-btn radius-3 focus-shadow">
											Approve?
										</button>
									</div>
								</li>
								<li>
									<p className="item-info">
										<span>
											<Link to="#">mustafa salah</Link>
											<i>Reviews:</i>
										</span>
										<time dateTime="2019-07-20T19:10:00">
											50 minute ago
										</time>
									</p>
									<div className="item-content">
										<strong>
											<Link to="#">Hunter X Hunter</Link>
										</strong>
									</div>
								</li>
								<li>
									<p className="item-info">
										<span>
											<Link to="#">ali osman</Link>
											<i>Reviews on:</i>
										</span>
										<time dateTime="2019-07-20T19:10:00">
											02 day ago
										</time>
									</p>
									<div className="item-content">
										<strong>
											<Link to="#">Death Parade</Link>
										</strong>
									</div>
								</li>
								<li>
									<p className="item-info">
										<span>
											<Link to="#">ali osman</Link>
											<i>Reviews on:</i>
										</span>
										<time dateTime="2019-07-20T19:10:00">
											05 day ago
										</time>
									</p>
									<div className="item-content">
										<strong>
											<Link to="#">Toy Story 3</Link>
										</strong>
									</div>
								</li>
								<li className="show-more">
									<Link to="#">Show More</Link>
								</li>
							</ol>
						</div>
					</section>
				</div>
			</Fragment>
		);
	}
}

export default Dashboard;
