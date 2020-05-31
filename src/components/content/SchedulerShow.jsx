import React from "react";

const SchedulerShow = ({
	schedulerId,
	show,
	time,
	isGray,
	onShowDeleted,
	onShowUpdate,
}) => {
	return (
		<li className={isGray ? "gray" : ""}>
			<div className="show-poster">
				<a
					href={`/shows/${show.id}`}
					className="focus-shadow radius"
					style={{ backgroundImage: `url('${show.poster}')` }}
					title={show.name}
				></a>
			</div>
			<div className="show-info">
				<dl>
					<dt>Show Name:</dt>
					<dd>
						<a href={`/shows/${show.id}`}>{show.name}</a>
					</dd>

					<dt>Show Time:</dt>
					<dd>
						<time dateTime={time}>{time} GMT</time>
					</dd>
				</dl>
				<div className="day-show-actions">
					<button
						onClick={() => onShowDeleted(schedulerId)}
						className="dark-btn focus-shadow radius-3"
					>
						Remove
					</button>
					<button
						onClick={() => {
							window.scrollTo(0, 0);
							onShowUpdate(schedulerId);
						}}
						className="primary-btn focus-shadow radius-3"
					>
						Update
					</button>
				</div>
			</div>
		</li>
	);
};

export default SchedulerShow;
