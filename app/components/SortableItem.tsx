import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function SortableItem(props: any) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: props.id, transition: null });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		color: "white",
		margin: "10px",
	};

	return (
		<div ref={setNodeRef} style={style} {...attributes} {...listeners}>
			{props.children}
		</div>
	);
}
