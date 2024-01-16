import { Dispatch, SetStateAction } from "react";
import { FormElement, State } from "../page";

export enum FormElements {
	Input = "input",
	Select = "select",
}

export const RenderFormElement = ({
	element,
	setState,
}: {
	element: FormElement;
	setState: Dispatch<SetStateAction<string>>;
}) => {
	const { type } = element;

	if (type === FormElements.Input) {
		return (
			<input value={element.value} onChange={(e) => setState(e.target.value)} />
		);
	} else if (type === FormElements.Select) {
		return <div>Select</div>;
	}

	return <div>Invalid element</div>;
};
