"use client";

import { Label, Select } from "flowbite-react";
import {
	FormElements,
	RenderFormElement,
} from "./components/RenderFormElement";
import { Dispatch, SetStateAction, useState } from "react";

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

const renderForm = (
	formState: Form,
	setGlobalState: Dispatch<SetStateAction<State>>
) =>
	formState.formElements.map((e, i) => {
		const setElementState = (value: any) => {
			setGlobalState((prevValue) => {
				const updatedForms = prevValue.forms.map((f) => {
					if (f.formId !== formState.formId) {
						return f;
					}

					const updatedFormElements = f.formElements.map((fe) => {
						if (e.id !== fe.id) {
							return fe;
						}
						const updatedElement = { ...fe, value };
						return updatedElement;
					});
					return { ...f, formElements: updatedFormElements };
				});

				return { ...prevValue, forms: updatedForms };
			});
		};
		return (
			<div key={`element-${i}`} className="my-3">
				<RenderFormElement element={e} setState={setElementState} />
			</div>
		);
	});

export default function Home() {
	const [selectedTemplate, setSelectedTemplate] = useState<string>("");
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
			{selectedFormStateElements &&
				selectedFormStateId &&
				renderForm(selectedFormState, setGlobalState)}
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

export type State = {
	forms: Form[];
};
