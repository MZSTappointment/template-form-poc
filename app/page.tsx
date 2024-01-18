"use client";

import { Label, Select, Button, TextInput } from "flowbite-react";
import { useState } from "react";
import { RenderForm } from "./components/RenderForm";
import { v4 as uuidv4 } from "uuid";

export enum FormElements {
	Input = "input",
	Textarea = "textarea",
	Select = "select",
	Checkbox = "checkbox",
	Toggle = "toggle",
}
const NOT_SELECTED = "not-selected";

const state: State = {
	forms: [
		{
			formId: "1",
			formName: "User registration",
			formElements: [
				{
					id: "1",
					label: "Name",
					type: FormElements.Input,
					value: "",
					customProps: { placeholder: "Type you name" },
				},
				{
					id: "2",
					label: "Gender",
					type: FormElements.Select,
					value: "",
					customProps: {
						selectElements: [
							{ label: "Male", value: "male" },
							{ label: "Female", value: "female" },
							{ label: "Other", value: "other" },
						],
					},
				},
				{
					id: "3",
					label: "City",
					type: FormElements.Input,
					value: "",
				},
				{
					id: "4",
					label: "Agreed",
					type: FormElements.Checkbox,
					value: false,
				},
				{
					id: "5",
					label: "Toggle element",
					type: FormElements.Toggle,
					value: false,
				},
				{
					id: "6",
					label: "Write about yourself",
					type: FormElements.Textarea,
					value: "",
					customProps: { placeholder: "Write about yourself", rows: 10 },
				},
			],
		},
		{
			formId: "2",
			formName: "Finance data",
			formElements: [
				{
					id: "1",
					label: "Revenue 2023",
					type: FormElements.Input,
					value: "",
				},
				{
					id: "3",
					label: "Tax",
					type: FormElements.Input,
					value: "1111",
				},
			],
		},
	],
};

const createEmptyForm = (formName: string) => {
	return {
		formId: uuidv4(),
		formName,
		formElements: [],
	};
};

const emptyFormElements = {
	[FormElements.Input]: {
		type: FormElements.Input,
		value: "",
		customProps: {},
	},
	[FormElements.Textarea]: {
		type: FormElements.Textarea,
		value: "",
		customProps: {},
	},
	[FormElements.Select]: {
		type: FormElements.Select,
		value: "",
		customProps: {
			selectElements: [
				{ label: "1", value: "1" },
				{ label: "2", value: "2" },
				{ label: "3", value: "3" },
			],
		},
	},
	[FormElements.Checkbox]: {
		label: "",
		type: FormElements.Checkbox,
		value: false,
		customProps: {},
	},
	[FormElements.Toggle]: {
		label: "",
		type: FormElements.Toggle,
		value: false,
		customProps: {},
	},
};

const createEmptyFormElement = (elementType: FormElements, label: string) =>
	({
		...emptyFormElements[elementType],
		id: uuidv4(),
		label,
	} as FormElement);

export default function Home() {
	const [selectedForm, setSelectedForm] = useState<string>(NOT_SELECTED);
	const [formName, setFormName] = useState("");
	const [globalState, setGlobalState] = useState(state);
	const [selectedFormElement, setSelectedFormElement] = useState<{
		type: FormElements | typeof NOT_SELECTED;
		label: string;
	}>({ type: NOT_SELECTED, label: "" });
	const selectedFormState = globalState.forms.find(
		(f) => f.formId === selectedForm
	);

	return (
		<div className="flex align-middle flex-col gap-10 p-10">
			<div className="text-base text-gray-900 dark:text-white">
				Form creator
			</div>
			<div className="flex gap-10">
				<TextInput
					value={formName}
					onChange={(e) => setFormName(e.target.value)}
					placeholder="Add form name"
				/>
				<Button
					disabled={!formName}
					onClick={() => {
						setGlobalState((prevValue) => {
							return {
								...prevValue,
								forms: [...prevValue.forms, createEmptyForm(formName)],
							};
						});
						setFormName("");
					}}
				>
					Create new form
				</Button>
			</div>

			<hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
			<div className="max-w-md mb-1 px-10">
				<div className="mb-2 block">
					<Label htmlFor="templates" value="Select form" />
				</div>
				<Select
					id="templates"
					required
					onChange={(e) => {
						setSelectedForm(e.target.value);
					}}
					value={selectedForm}
				>
					<option disabled value={NOT_SELECTED}>
						Choose a form
					</option>
					{globalState.forms.map(({ formName, formId }, index) => {
						return (
							<option key={formName + index} value={formId}>
								{formName}
							</option>
						);
					})}
				</Select>
			</div>
			{selectedFormState && (
				<div className="p-10">
					<RenderForm
						formState={selectedFormState}
						setGlobalState={setGlobalState}
					/>
					<hr className="my-8" />
					<div className="flex gap-10 m">
						<Select
							id="formElements"
							required
							onChange={(e) => {
								setSelectedFormElement((prevValue) => ({
									...prevValue,
									type: e.target.value as FormElements,
								}));
							}}
							value={selectedFormElement.type}
						>
							<option disabled value={NOT_SELECTED}>
								Choose a form element to add
							</option>
							{Object.values(FormElements).map((value) => (
								<option key={value} value={value}>
									{value}
								</option>
							))}
						</Select>
						<TextInput
							value={selectedFormElement.label}
							onChange={(e) =>
								setSelectedFormElement((prevValue) => ({
									...prevValue,
									label: e.target.value,
								}))
							}
							placeholder="Add form element label"
						/>
						<Button
							disabled={
								selectedFormElement.type === NOT_SELECTED ||
								!selectedFormElement.label
							}
							onClick={() => {
								setGlobalState((prevValue) => {
									const updatedForms = prevValue.forms.map((form) => {
										if (form.formId !== selectedFormState.formId) return form;
										const updatedForm = {
											...form,
											formElements: [
												...form.formElements,
												createEmptyFormElement(
													selectedFormElement.type as FormElements,
													selectedFormElement.label
												),
											],
										};
										return updatedForm;
									});
									return {
										...prevValue,
										forms: updatedForms,
									};
								});
							}}
						>
							Add element
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}

export type Form = {
	formId: string;
	formName: string;
	formElements: FormElement[];
};

export type State = {
	forms: Form[];
};

type BaseFormElement = {
	id: string;
	label: string;
};

export type InputFormElement = BaseFormElement & {
	type: FormElements.Input;
	value: string;
	customProps?: { placeholder?: string };
};

export type TextareaFormElement = BaseFormElement & {
	type: FormElements.Textarea;
	value: string;
	customProps?: { placeholder?: string; rows?: number };
};

export type SelectFormElement = BaseFormElement & {
	type: FormElements.Select;
	value: string;
	customProps: { selectElements: { label: string; value: string }[] };
};

export type CheckboxFormElement = BaseFormElement & {
	type: FormElements.Checkbox;
	value: boolean;
	customProps?: {};
};

export type ToggleFormElement = BaseFormElement & {
	type: FormElements.Toggle;
	value: boolean;
	customProps?: {};
};

export type FormElement =
	| InputFormElement
	| TextareaFormElement
	| SelectFormElement
	| CheckboxFormElement
	| ToggleFormElement;
