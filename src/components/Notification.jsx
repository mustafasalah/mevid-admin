import React from "react";
import { Link } from "react-router-dom";

const Notification = () => {
	return (
		<div className="top-bar-btn" id="notify-btn" title="notification panel">
			<button>
				<i className="fas fa-bell">
					<span className="counter">6</span>
				</i>
			</button>
			<ul className="sub-menu blur-shadow">
				<li>
					<Link to="#">
						<span className="notify-label comment">Comment</span>
						<span className="counter">2</span>
						<p>Epsiode 02: Death Parade</p>
					</Link>
				</li>
				<li>
					<Link to="#">
						<span className="notify-label review">Review</span>
						<span className="counter">3</span>
						<p>Spider-Man: Into the Spider-Verse</p>
					</Link>
				</li>
				<li>
					<Link to="#">
						<span className="notify-label user">User</span>
						<p>ahmed_salem</p>
					</Link>
				</li>
				<li>
					<Link to="#">
						<span className="notify-label report">Report</span>
						<p>Hunter X Hunter - Episode 22</p>
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default Notification;
