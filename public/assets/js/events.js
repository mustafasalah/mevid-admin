(function ($) {
	// event for top bar admin buttons
	$("#admin-btns button").on("click", function () {
		$("#admin-btns button").not(this).removeClass("active");
		$(this).toggleClass("active");
	});

	// Event for sliding forms up and down
	$("#content-section").on("click", ".form > h3", function () {
		$(this)
			.toggleClass("closed blur-shadow")
			.next(".widget-content")
			.slideToggle(400);
	});

	// Show more items when more btn clicked
	// $("#content-section *:not(#scheduler-container) .more-btn").on(
	// 	"click",
	// 	function () {
	// 		var prevElem = $(this).prev(),
	// 			index = prevElem.index() + 1,
	// 			html = $(this).prev().get(0).outerHTML;

	// 		html = html.replace(
	// 			/(image(-url)? ?|server(s\d)?-(name|link)-?)\d|player-\d/gi,
	// 			function (match, fieldName) {
	// 				if (match.startsWith("player-")) {
	// 					return "player-" + index;
	// 				}
	// 				return fieldName + (index + 1);
	// 			}
	// 		);

	// 		$(html).insertBefore(this);
	// 	}
	// );

	// Event for Showing Sub Links area
	$("#layout").on("mousedown", "button.sub-link", function () {
		var subLinkArea = $(this).parents(".row").first().next();

		subLinkArea.slideToggle(0);
	});

	// Event for deleting links on main menu
	$("#layout").on("mousedown", "button.delete-btn", function () {
		$(this).parents(".col-1").eq(1).remove();
	});
})(jQuery);
