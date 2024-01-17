import { Dispatch, SetStateAction } from "react";
import { Form, State } from "../page";
import { RenderFormElement } from "./RenderFormElement";

export const RenderForm = ({
	formState,
	setGlobalState,
}: {
	formState: Form;
	setGlobalState: Dispatch<SetStateAction<State>>;
}) => {
	return (
		<>
			{formState.formElements.map((e, i) => {
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
			})}
		</>
	);
};
