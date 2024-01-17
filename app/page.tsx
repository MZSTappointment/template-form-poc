"use client";

import { Label, Select, Button, TextInput } from "flowbite-react";
import { useState } from "react";
import { RenderForm } from "./components/RenderForm";

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
	templateElements: [],
};

export default function Home() {
	const [selectedForm, setSelectedForm] = useState<string>(NOT_SELECTED);
	const [selectedFormElement, setSelectedFormElement] =
		useState<string>(NOT_SELECTED);
	const [formName, setFormName] = useState("");
	const [globalState, setGlobalState] = useState(state);
	const selectedFormState = globalState.forms.find(
		(f) => f.formId === selectedForm
	);

	return (
		<div className="flex align-middle flex-col gap-10">
			<div className="text-base text-gray-900 dark:text-white">
				Template creator
			</div>
			<div className="flex gap-10">
				<Select
					id="formElements"
					required
					onChange={(e) => {
						setSelectedFormElement(e.target.value);
					}}
					value={selectedFormElement}
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
				<Button color="blue" disabled={selectedFormElement === NOT_SELECTED}>
					Add +
				</Button>
			</div>
			<div className="flex gap-10">
				<TextInput
					value={formName}
					onChange={(e) => setFormName(e.target.value)}
					placeholder="Add form name"
				/>
				<Button
					color="blue"
					disabled={!formName || globalState.templateElements.length === 0}
				>
					Create new form
				</Button>
			</div>

			<hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
			<div className="max-w-md mb-1">
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
					{state.forms.map(({ formName, formId }, index) => {
						return (
							<option key={formName + index} value={formId}>
								{formName}
							</option>
						);
					})}
				</Select>
			</div>
			{selectedFormState && (
				<RenderForm
					formState={selectedFormState}
					setGlobalState={setGlobalState}
				/>
			)}
		</div>
	);
}

export type Form = {
	formId: string;
	formName: string;
	formElements: FormElement[];
};

type Template = {
	templateId: string;
	templateName: string;
	templateElements: FormElement[];
};

export type State = {
	forms: Form[];
	// templates: Template[];
	templateElements: [];
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
