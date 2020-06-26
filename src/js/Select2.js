import React, { Component, useRef, useEffect } from "react";
import $ from "jquery";
import "select2";
import "select2/dist/css/select2.min.css";

// class Select2 extends Component {
// 	componentDidMount() {
// 		this.$el = $(this.el);
// 		this.$el.val(this.props.value);
// 		this.$el.select2(this.props.options);

// 		this.handleChange = this.handleChange.bind(this);
// 		this.$el.on("select2:select select2:unselect", this.handleChange);
// 	}

// 	componentDidUpdate() {
// 		this.$el.val(this.props.value);
// 		this.$el.select2(this.props.options);
// 	}

// 	componentWillUnmount() {
// 		this.$el.off("select2:select select2:unselect", this.handleChange);
// 		this.$el.select2("destroy");
// 	}

// 	handleChange(e) {
// 		this.props.onChange(e.target);
// 	}

// 	render() {
// 		const { data, options, value, onChange, ...attrs } = this.props;
// 		return (
// 			<select {...attrs} ref={(el) => (this.el = el)}>
// 				{this.props.data.map(({ id, text, ...props }) => (
// 					<option key={id} {...props}>
// 						{text}
// 					</option>
// 				))}
// 			</select>
// 		);
// 	}
// }

const Select2 = ({ data, options, value, onChange, ...attrs }) => {
	let el = useRef(null);

	useEffect(() => {
		const $el = $(el);
		$el.val(value);
		$el.select2(options);

		const handleChange = (e) => {
			onChange(e.target);
		};

		$el.on("select2:select select2:unselect", handleChange);

		return () => {
			$el.off("select2:select select2:unselect", handleChange);
			$el.select2("destroy");
		};
	}, [value]);

	return (
		<select {...attrs} ref={(elem) => (el = elem)}>
			{data.map(({ id, text, ...props }) => (
				<option key={id} {...props}>
					{text}
				</option>
			))}
		</select>
	);
};

export default Select2;
