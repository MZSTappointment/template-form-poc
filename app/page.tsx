"use client";

import { Label, Select } from "flowbite-react";
import { useState } from "react";
import { RenderForm } from "./components/RenderForm";

export enum FormElements {
	Input = "input",
	Textarea = "textarea",
	Select = "select",
	Checkbox = "checkbox",
	Toggle = "toggle",
}

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
	templates: [],
};

export default function Home() {
	const [selectedTemplate, setSelectedTemplate] =
		useState<string>("not-selected");
	const [globalState, setGlobalState] = useState(state);
	const selectedFormState = globalState.forms.find(
		(f) => f.formId === selectedTemplate
	);
	const selectedFormStateElements = selectedFormState?.formElements;
	const selectedFormStateId = selectedFormState?.formId;

	return (
		<div className="flex align-middle flex-col">
			<div className="max-w-md mb-1">
				<div className="mb-2 block">
					<Label htmlFor="templates" value="Select form" />
				</div>
				<Select
					id="templates"
					required
					onChange={(e) => {
						setSelectedTemplate(e.target.value);
					}}
					value={selectedTemplate}
				>
					<option disabled value={"not-selected"}>
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
	templates: Template[];
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
