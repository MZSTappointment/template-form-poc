enum FormElement {
	Input = "input",
	Dropdown = "dropdown",
}

const RenderFormElement = ({ type }: { type: FormElement }) => {
	if (type === FormElement.Input) {
		return <input />;
	} else if (type === FormElement.Dropdown) {
		<div>Dropdown</div>;
	}

	return <div>Invalid element</div>;
};
