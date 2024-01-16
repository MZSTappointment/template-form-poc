"use client";

import { Label, Select } from "flowbite-react";
import {
	FormElements,
	RenderFormElement,
} from "./components/RenderFormElement";
import { useState } from "react";

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
				},
				{
					id: "2",
					label: "Gender",
					type: FormElements.Select,
					value: "",
					values: ["Male", "Female"],
				},
				{
					id: "3",
					label: "City",
					type: FormElements.Input,
					value: "",
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

const renderForm = (formElements: FormElement[]) =>
	formElements.map((e, i) => (
		<div key={`element-${i}`} className="my-3">
			<RenderFormElement element={e} setState={() => {}} />
		</div>
	));

export default function Home() {
	const [selectedTemplate, setSelectedTemplate] = useState<string>("");
	const selectedForm = state.forms.find((f) => f.formId === selectedTemplate);
	const selectedFormElements = selectedForm?.formElements;

	return (
		<div className="flex align-middle flex-col">
			<div className="max-w-md mb-1">
				<div className="mb-2 block">
					<Label htmlFor="templates" value="Select template" />
				</div>
				<Select
					id="templates"
					required
					onChange={(e) => {
						setSelectedTemplate(e.target.value);
					}}
					value={selectedTemplate}
				>
					{state.forms.map(({ formName, formId }, index) => {
						return (
							<option key={formName + index} value={formId}>
								{formName}
							</option>
						);
					})}
				</Select>
			</div>
			{selectedFormElements && renderForm(selectedFormElements)}
		</div>
	);
}

export type FormElement = {
	id: string;
	label: string;
	type: FormElements;
	value: string;
	values?: string[];
};

type Form = {
	formId: string;
	formName: string;
	formElements: FormElement[];
};

type State = {
	forms: Form[];
};
