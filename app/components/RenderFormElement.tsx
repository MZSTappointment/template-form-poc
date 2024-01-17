import { Dispatch, SetStateAction } from "react";
import { FormElement, State } from "../page";
import { TextInput } from "flowbite-react";

export enum FormElements {
	Input = "input",
	Select = "select",
}

export const RenderFormElement = ({
	element,
	setElementState,
}: {
	element: FormElement;
	setElementState: Dispatch<SetStateAction<string>>;
}) => {
	const { type } = element;

	if (type === FormElements.Input) {
		return (
			<TextInput
				value={element.value}
				onChange={(e) => setElementState(e.target.value)}
			/>
		);
	} else if (type === FormElements.Select) {
		return <div>Select</div>;
	}

	return <div>Invalid element</div>;
};
