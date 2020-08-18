import React, { Component } from "react";
import FormField from "../common/form/FormField";
import getTags from "./../services/getTags";

class TagsField extends Component {
	state = {
		options: [],
	};

	async componentDidMount() {
		const { data } = await getTags();
		this.setState({
			options: data.map(({ name }) => ({ label: name, value: name })),
		});
	}

	render() {
		return <FormField options={this.state.options} {...this.props} />;
	}
}

export default TagsField;
