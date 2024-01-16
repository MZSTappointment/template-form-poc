import { FormElement } from "../page";

export enum FormElements {
	Input = "input",
	Select = "select",
}

export const RenderFormElement = ({
	element,
	setState,
}: {
	element: FormElement;
	setState: () => void;
}) => {
	console.log("element: ", element);
	const { type } = element;

	if (type === FormElements.Input) {
		console.log("element.value: ", element.value);
		return <input value={element.value} onChange={setState} />;
	} else if (type === FormElements.Select) {
		return <div>Select</div>;
	}

	return <div>Invalid element</div>;
};
