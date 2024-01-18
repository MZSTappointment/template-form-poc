import { Dispatch, SetStateAction } from "react";
import { FormElement } from "../page";
import { TextInput, Select } from "flowbite-react";
import { FormElements } from "../page";

export const RenderFormElement = ({
	element,
	setElementState,
}: {
	element: FormElement;
	setElementState: Dispatch<SetStateAction<string | boolean>>;
}) => {
	const { type, label, value, customProps } = element;

	if (type === FormElements.Input) {
		const placeholder = customProps?.placeholder || "";
		return (
			<>
				<div className="dark:text-gray-300">{label}</div>
				<TextInput
					value={value}
					onChange={(e) => setElementState(e.target.value)}
					placeholder={placeholder}
				/>
			</>
		);
	} else if (type === FormElements.Textarea) {
		const rows = customProps?.rows || 5;
		const placeholder = customProps?.placeholder || "";
		return (
			<>
				<label
					htmlFor="message"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					{label}
				</label>
				<textarea
					id={`textarea-${label}`}
					rows={rows}
					className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder={placeholder}
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
	} else if (type === FormElements.Toggle) {
		return (
			<>
				<label className="relative inline-flex items-center cursor-pointer">
					<input
						type="checkbox"
						value=""
						className="sr-only peer"
						checked={value}
						onChange={() => setElementState(!value)}
					/>
					<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
					<span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
						{label}
					</span>
				</label>
			</>
		);
	}

	return <div>Invalid element</div>;
};
