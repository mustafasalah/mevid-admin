class Draggable {
	constructor(droppable, draggable) {
		this.droppable = $(droppable);
		this.draggable = $(draggable);

		this.droppable.css("position", "relative");
		this.draggable.on("mousedown", this.handleDrag);
	}

	handleDrag() {
		const draggedElem = $(this);
		draggedElem.css({
			position: "absolute"
		});

		draggedElem.on("mousemove", this.moveDraggedElement);
	}

	moveDraggedElement() {
		const draggedElem = $(this);
	}
}
