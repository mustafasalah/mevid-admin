import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import SchedulerActions from "../../actions/SchedulerActions";
import SectionHeader from "../common/SectionHeader";
import SchedulerForm from "./SchedulerForm";
import SchedulerDaySection from "./SchedulerDaySection";
import Loader from "./../common/Loader";

const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

const Scheduler = ({
	onSchedulerLoad,
	onShowAdded,
	onShowUpdated,
	onShowUpdate,
	onShowDeleted,
	onFieldUpdate,
	schedulers,
	shows,
	schedulerForm,
}) => {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		onSchedulerLoad(() => {
			setLoaded(true);
		});
	}, []);

	return (
		<Fragment>
			<SectionHeader name="Scheduler" faClass="far fa-calendar-alt" />
			<div id="scheduler-container">
				<SchedulerForm
					onShowAdded={onShowAdded}
					onShowUpdated={onShowUpdated}
					onFieldUpdate={onFieldUpdate}
					schedulers={schedulers}
					shows={shows}
					data={schedulerForm}
				/>
				{loaded ? (
					days.map((day) => (
						<SchedulerDaySection
							key={day}
							day={day}
							shows={shows}
							schedulers={schedulers.filter(
								({ day: showDay }) => day === showDay
							)}
							onShowDeleted={onShowDeleted}
							onShowUpdate={onShowUpdate}
						/>
					))
				) : (
					<Loader />
				)}
			</div>
		</Fragment>
	);
};

export default connect(
	(state) => ({ ...state.schedule, shows: state.shows }),
	SchedulerActions
)(Scheduler);
