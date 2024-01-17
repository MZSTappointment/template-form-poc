import { Dispatch, SetStateAction } from "react";
import { FormElement, State } from "../page";
import { TextInput, Select } from "flowbite-react";

export enum FormElements {
	Input = "input",
	Select = "select",
	Checkbox = "checkbox",
}

export const RenderFormElement = ({
	element,
	setElementState,
}: {
	element: FormElement;
	setElementState: Dispatch<SetStateAction<string | boolean>>;
}) => {
	const { type, label, value, customProps } = element;

	if (type === FormElements.Input) {
		return (
			<>
				<div>{label}</div>
				<TextInput
					value={value}
					onChange={(e) => setElementState(e.target.value)}
				/>
			</>
		);
	} else if (type === FormElements.Select) {
		return (
			<>
				<div>{label}</div>
				<Select id={`select-${label}`} required>
					{customProps.selectElements.map((e) => (
						<option key={`key-${e.value}`} value={e.value}>
							{e.label}
						</option>
					))}
				</Select>
			</>
		);
	} else if (type === FormElements.Checkbox) {
		return (
			<>
				<div className="flex items-center mb-4">
					<input
						id="default-checkbox"
						type="checkbox"
						checked={value}
						onChange={() => setElementState(!value)}
						className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
					/>
					<label
						htmlFor="default-checkbox"
						className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>
						{label}
					</label>
				</div>
			</>
		);
	}

	return <div>Invalid element</div>;
};
