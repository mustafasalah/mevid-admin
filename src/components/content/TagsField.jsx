import React, { Component } from "react";
import FormField from "../common/form/FormField";
import getTags from "./../services/getTags";

class TagsField extends Component {
	state = {
		options: [],
	};

	async componentDidMount() {
		const { data } = await getTags();
		const { tagValuePrefix, urlEncodeValue } = this.props;
		this.setState({
			options: data.map(({ name }) => ({
				label: name,
				value:
					tagValuePrefix +
					(urlEncodeValue ? window.encodeURIComponent(name) : name),
			})),
		});
	}

	render() {
		const { tagValuePrefix, urlEncodeValue, ...props } = this.props;
		return <FormField options={this.state.options} {...props} />;
	}
}

TagsField.defaultProps = {
	tagValuePrefix: "",
	urlEncodeValue: false,
};

export default TagsField;
