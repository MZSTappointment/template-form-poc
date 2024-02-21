import { Dispatch, SetStateAction, useState } from "react";
import { Form, State } from "../page";
import { RenderFormElement } from "./RenderFormElement";
import { SortableItem } from "../components/SortableItem";
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	DragEndEvent,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export const RenderForm = ({
	formState,
	setGlobalState,
}: {
	formState: Form;
	setGlobalState: Dispatch<SetStateAction<State>>;
}) => {
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;

		if (active.id !== over.id) {
			setGlobalState((prevValue) => {
				const updatedForms = prevValue.forms.map((f) => {
					if (f.formId !== formState.formId) {
						return f;
					}

					const oldIndex = f.formElements.findIndex((e) => e.id === active.id);
					const newIndex = f.formElements.findIndex((e) => e.id === over.id);
					const updatedFormElements = arrayMove(
						f.formElements,
						oldIndex,
						newIndex
					);
					return { ...f, formElements: updatedFormElements };
				});

				return { ...prevValue, forms: updatedForms };
			});
		}
	}

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
		>
			<SortableContext
				items={formState.formElements.map((e) => e.id)}
				strategy={verticalListSortingStrategy}
			>
				{formState.formElements.map((e, i) => {
					const setElementState = (value: any) => {
						setGlobalState((prevValue) => {
							const updatedForms = prevValue.forms.map((f) => {
								if (f.formId !== formState.formId) {
									return f;
								}

								const updatedFormElements = f.formElements.map((fe) => {
									if (e.id !== fe.id) {
										return fe;
									}
									const updatedElement = { ...fe, value };
									return updatedElement;
								});
								return { ...f, formElements: updatedFormElements };
							});

							return { ...prevValue, forms: updatedForms };
						});
					};
					return (
						<SortableItem key={e.id} id={e.id}>
							<div key={`element-${i}`} className="my-3">
								<RenderFormElement
									element={e}
									setElementState={setElementState}
								/>
							</div>
						</SortableItem>
					);
				})}
			</SortableContext>
		</DndContext>
	);
};
