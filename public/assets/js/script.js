(function ($) {
	$(function () {
		// // Launch Select2
		// $("select.select2").each(function() {
		// 	var selectElem = $(this);
		// 	selectElem.select2({
		// 		placeholder: selectElem.data("placeholder"),
		// 		width: "element",
		// 		tags: selectElem.hasClass("support-tags")
		// 	});
		// });
		// Launch Datepicker
		// $("input.date").each(function () {
		// 	var inputElem = $(this),
		// 		options = {
		// 			format: "yyyy-mm-dd", // default date format
		// 		};
		// 	switch (inputElem.attr("id")) {
		// 		case "aired-to":
		// 			options.startDate = new Date();
		// 			break;
		// 		case "release-year":
		// 			options.format = "yyyy";
		// 			break;
		// 		case "show-day":
		// 			options.format = "d";
		// 			break;
		// 	}
		// 	inputElem.datepicker(options);
		// });
		// $("#aired-from").on("pick.datepicker", function (e) {
		// 	$("#aired-to").datepicker("setStartDate", e.date);
		// });
		// Launch Rating
		// $("#reviews-table .rating").each(function () {
		// 	var rate = $(this),
		// 		rating = parseFloat(rate.data("rating")),
		// 		starsCount = parseInt(rating),
		// 		haveHalf =
		// 			Math.round(rating) === Math.ceil(rating) &&
		// 			starsCount !== rating;
		// 	rate.children().addClass(function (i) {
		// 		if (i === starsCount && haveHalf) return "fas fa-star-half-alt";
		// 		return (i < starsCount ? "fas " : "far ") + "fa-star";
		// 	});
		// });
		// Launch Quill Editor
		// if (typeof Quill !== "undefined") {
		// 	var toolbarOptions = [
		// 			[{ header: [3, 4, 5, 6, false] }],
		// 			[{ size: ["small", false, "large", "huge"] }], // custom dropdown
		// 			["bold", "italic", "underline", "strike"], // toggled buttons
		// 			["blockquote", "code-block"],
		// 			[{ list: "ordered" }, { list: "bullet" }],
		// 			[{ indent: "-1" }, { indent: "+1" }], // outdent/indent
		// 			[{ direction: "rtl" }], // text direction
		// 			["link", "image", "video"], // link & Media
		// 			[{ color: [] }, { background: [] }], // dropdown with defaults from theme
		// 			[{ align: [] }],
		// 			["clean"], // remove formatting button
		// 		],
		// 		options = {
		// 			bounds: "#page-editor",
		// 			debug: "info",
		// 			modules: {
		// 				toolbar: toolbarOptions,
		// 			},
		// 			placeholder: "The page content here...",
		// 			theme: "snow",
		// 		};
		// 	var editor = new Quill(
		// 		document.getElementById("page-html-editor"),
		// 		options
		// 	);
		// }
		// Launch Sortable
		// if (typeof Sortable !== "undefined") {
		// 	var mainSortable = new Sortable.default(
		// 			document.querySelectorAll("#main-drop-zone"),
		// 			{
		// 				draggable: "#main-drop-zone > *",
		// 			}
		// 		),
		// 		sidebarSortable = new Sortable.default(
		// 			document.querySelectorAll("#sidebar-drop-zone"),
		// 			{
		// 				draggable: "#sidebar-drop-zone > *",
		// 			}
		// 		),
		// 		footerSortable = new Sortable.default(
		// 			document.querySelectorAll("#footer-drop-zone"),
		// 			{
		// 				draggable: "#footer-drop-zone > *",
		// 			}
		// 		),
		// 		mainMenuSortable = new Sortable.default(
		// 			document.querySelectorAll(".main-menu-drop-zone"),
		// 			{
		// 				draggable: ".main-menu-drop-zone > *",
		// 			}
		// 		);
		// 	// Get real width for dragged widget
		// 	function realWidth(e) {
		// 		var originalWidth = e.data.dragEvent.source.offsetWidth;
		// 		$(".draggable-mirror").outerWidth(originalWidth);
		// 	}
		// 	mainSortable.on("sortable:sort", realWidth);
		// 	sidebarSortable.on("sortable:sort", realWidth);
		// 	footerSortable.on("sortable:sort", realWidth);
		// 	mainMenuSortable.on("sortable:sort", realWidth);
		// 	mainMenuSortable.on("sortable:sorted", function (e) {
		// 		var elem = $(e.data.dragEvent.source);
		// 		// Check if the Link was dragged to sub links area
		// 		if (elem.parents(".sub-menu").length) {
		// 			// Get all nest links within the link
		// 			var nestedLinks = elem.children(".sub-menu").children();
		// 			// And add them to same sub links area
		// 			// where the current link was added to
		// 			elem.after(nestedLinks);
		// 			// Delete the sub links from link after added
		// 			// and hide sub links area of the link
		// 			$(e.data.dragEvent.originalSource)
		// 				.children(".sub-menu")
		// 				.empty()
		// 				.hide();
		// 		}
		// 	});
		// }
	});
})(jQuery);
