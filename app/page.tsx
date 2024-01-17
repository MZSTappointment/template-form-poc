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
				<RenderFormElement element={e} setElementState={setElementState} />
			</div>
		);
	});

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
					<option disabled value={"not-selected"}>
						Choose a country
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
			{selectedFormStateElements &&
				selectedFormStateId &&
				renderForm(selectedFormState, setGlobalState)}
		</div>
	);
}

type Form = {
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
	customProps?: {};
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

export type FormElement =
	| InputFormElement
	| SelectFormElement
	| CheckboxFormElement;
