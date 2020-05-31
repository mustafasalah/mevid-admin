import $ from "jquery";
import "@chenfengyuan/datepicker";
import "../css/datepicker.css";

const runDatepicker = (input, datetype, onChange) => {
	const $input = $(input),
		options = {};

	switch (datetype) {
		case "year":
			options.format = "yyyy";
			break;

		case "day":
			options.format = "d";
			break;

		case "date-to":
			options.startDate = new Date();
			options.format = "yyyy-mm-dd";
			break;

		default:
			options.format = "yyyy-mm-dd";
	}

	$input.on("pick.datepicker", function (e) {
		if (datetype === "date-from") {
			$("input[datetype='date-to']").datepicker("setStartDate", e.date);
		}
		// trigger change event
		onChange({ currentTarget: this });
	});

	$input.datepicker(options);
};

export default runDatepicker;
