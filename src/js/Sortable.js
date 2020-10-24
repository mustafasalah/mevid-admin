import { Sortable } from "@shopify/draggable";
import $ from "jquery";

export default function runSortable(pageType = "layout") {
	let mainSortable, sidebarSortable, footerSortable, mainMenuSortable;

	// Get real width for dragged widget
	function realWidth(e) {
		var originalWidth = e.data.dragEvent.source.offsetWidth;
		$(".draggable-mirror").outerWidth(originalWidth);
	}

	if (pageType === "layout") {
		mainSortable = new Sortable(
			document.querySelectorAll("#main-drop-zone"),
			{
				draggable: "#main-drop-zone > *",
			}
		);
		sidebarSortable = new Sortable(
			document.querySelectorAll("#sidebar-drop-zone"),
			{
				draggable: "#sidebar-drop-zone > *",
			}
		);
		footerSortable = new Sortable(
			document.querySelectorAll("#footer-drop-zone"),
			{
				draggable: "#footer-drop-zone > *",
			}
		);

		mainSortable.on("sortable:sort", realWidth);
		sidebarSortable.on("sortable:sort", realWidth);
		footerSortable.on("sortable:sort", realWidth);

		return {
			mainSortable,
			sidebarSortable,
			footerSortable,
		};
		
	} else {
		mainMenuSortable = new Sortable(
			document.querySelectorAll(".main-menu-drop-zone"),
			{
				draggable: ".main-menu-drop-zone > *",
			}
		);

		mainMenuSortable.on("sortable:sort", realWidth);
		mainMenuSortable.on("sortable:sorted", function (e) {
			var elem = $(e.data.dragEvent.source);

			// Check if the Link was dragged to sub links area
			if (elem.parents(".sub-menu").length) {
				// Get all nest links within the link
				var nestedLinks = elem.children(".sub-menu").children();

				// And add them to same sub links area
				// where the current link was added to
				elem.after(nestedLinks);

				// Delete the sub links from link after added
				// and hide sub links area of the link
				$(e.data.dragEvent.originalSource)
					.children(".sub-menu")
					.empty()
					.hide();
			}
		});

		return mainMenuSortable;
	}
}
