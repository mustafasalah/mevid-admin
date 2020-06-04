import React, { Component } from "react";
import $ from "jquery";
import "select2";
import "select2/dist/css/select2.min.css";

class Select2 extends Component {
	componentDidMount() {
		this.$el = $(this.el);
		this.$el.val(this.props.value);
		this.$el.select2(this.props.options);

		this.handleChange = this.handleChange.bind(this);
		this.$el.on("select2:select select2:unselect", this.handleChange);
	}

	componentWillUnmount() {
		this.$el.off("select2:select select2:unselect", this.handleChange);
		this.$el.select2("destroy");
	}

	handleChange(e) {
		this.props.onChange(e.target);
	}

	render() {
		const { data, options, value, onChange, ...attrs } = this.props;
		return (
			<select {...attrs} ref={(el) => (this.el = el)}>
				{this.props.data.map(({ id, text, ...props }) => (
					<option key={id} {...props}>
						{text}
					</option>
				))}
			</select>
		);
	}
}

export default Select2;
