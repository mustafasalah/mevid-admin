import React from "react";
import AboutWidget from "./../layoutWidgets/AboutWidget";
import AccountWidget from "../layoutWidgets/AccountWidget";
import AddWidget from "./../layoutWidgets/AddWidget";
import AdsWidget from "./../layoutWidgets/AdsWidget";
import CategoryWidget from "./../layoutWidgets/CategoryWidget";
import LinksListWidget from "./../layoutWidgets/LinksListWidget";
import RecentWidget from "./../layoutWidgets/RecentWidget";
import PickedShowsWidget from "./../layoutWidgets/PickedShowsWidget";
import SchedulerWidget from "./../layoutWidgets/SchedulerWidget";
import SearchWidget from "./../layoutWidgets/SearchWidget";
import SliderWidget from "./../layoutWidgets/SliderWidget";
import SocialMediaWidget from "./../layoutWidgets/SocialMediaWidget";

const submitHandler = (id) => {
	console.log(id);
};
const deleteHandler = (id) => {};

const WidgetsWrapper = ({ widget }) => {
	if (widget.type === undefined) return null;

	switch (widget.type) {
		case "add":
			return (
				<AddWidget
					position={widget.position}
					onSubmit={{
						label: "Add Widget",
						handler: () => {},
					}}
				/>
			);

		case "slider":
			return <SliderWidget onSubmit={() => submitHandler(widget.id)} />;

		case "recent":
			return <RecentWidget onSubmit={() => submitHandler(widget.id)} />;

		case "ads":
			return (
				<AdsWidget
					onSubmit={() => submitHandler(widget.id)}
					onDelete={() => deleteHandler(widget.id)}
				/>
			);

		case "category":
			return (
				<CategoryWidget
					onSubmit={() => submitHandler(widget.id)}
					onDelete={() => deleteHandler(widget.id)}
				/>
			);

		case "social_media":
			return (
				<SocialMediaWidget onSubmit={() => submitHandler(widget.id)} />
			);

		case "search":
			return <SearchWidget onSubmit={() => submitHandler(widget.id)} />;

		case "schedule":
			return (
				<SchedulerWidget onSubmit={() => submitHandler(widget.id)} />
			);

		case "selected_shows":
			return (
				<PickedShowsWidget
					onSubmit={() => submitHandler(widget.id)}
					onDelete={() => deleteHandler(widget.id)}
				/>
			);

		case "about":
			return <AboutWidget onSubmit={() => submitHandler(widget.id)} />;

		case "links_list":
			return (
				<LinksListWidget onSubmit={() => submitHandler(widget.id)} />
			);

		case "account":
			return <AccountWidget onSubmit={() => submitHandler(widget.id)} />;

		default:
			return null;
	}
};

export default WidgetsWrapper;
