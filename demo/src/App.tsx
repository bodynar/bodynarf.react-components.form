import { useCallback, useState } from "react";

import { SelectableItem } from "@bodynarf/react.components";
import Accordion from "@bodynarf/react.components/components/accordion/component";
import CheckBox from "@bodynarf/react.components/components/primitives/checkbox/component";

import { FieldValue } from "@bodynarf/react.components.form";
import Form from "@bodynarf/react.components.form/component";

function App() {
	const [result, setResult] = useState<string>("");

	const [isDisabled, setDisabled] = useState(false);

	const onSubmit = useCallback(
		(values: FieldValue[]) => {
			setResult(
				JSON.stringify(values).replaceAll("},{", `},\n{`)
			);
		},
		[]
	);

	const onToggle = useCallback(() => setDisabled(x => !x), []);

	const lookupItems =
		new Array(50)
			.fill(0)
			.map((_, x) => x + 0)
			.map(x => ({
				value: `${x}`,
				displayValue: `Value ${x}`,
				id: `${x}`,
			}) as SelectableItem);

	return (
		<div className="container my-4">
			<Accordion
				caption="Configuration"
				defaultExpanded
				className="mt-2"
			>
				<div className="block">
					<CheckBox
						onValueChange={onToggle}
						block
						label={{
							caption: "Is form disabled",
							horizontal: true,
						}}
					/>
				</div>
			</Accordion>
			<Form
				name="test"
				caption="Test form"
				onSubmit={onSubmit}
				submitButtonConfiguration={{
					type: "success",
					caption: "Save",
					disabled: isDisabled
				}}
				items={[
					{
						name: "text",
						label: { caption: "Text" },
						type: "text",
						viewConfig: {
							layout: {
								column: 0,
								row: 0,
								columnSpan: 12,
							}
						},
						required: true,
						readonly: isDisabled,
					},
					{
						name: "multiline",
						label: { caption: "Multiline" },
						type: "multiline",
						viewConfig: {
							layout: {
								column: 0,
								row: 1,
								columnSpan: 12,
							}
						},
						required: true,
						readonly: isDisabled,
					},
					{
						name: "checkbox",
						label: { caption: "Checkbox" },
						type: "checkbox",
						viewConfig: {
							layout: {
								column: 0,
								row: 2,
								columnSpan: 12,
							}
						},
						required: true,
						readonly: isDisabled,
					},
					{
						name: "number",
						label: { caption: "Number with default value" },
						type: "number",
						viewConfig: {
							layout: {
								column: 0,
								row: 3,
								columnSpan: 12,
							}
						},
						defaultValue: 42,
						required: true,
						readonly: isDisabled,
					},
					{
						name: "date",
						label: { caption: "Late" },
						type: "date",
						viewConfig: {
							layout: {
								column: 0,
								row: 4,
								columnSpan: 12,
							}
						},
						required: true,
						readonly: isDisabled,
					},
					{
						name: "lookup",
						label: { caption: "Lookup" },
						type: "lookup",
						viewConfig: {
							layout: {
								column: 0,
								row: 5,
								columnSpan: 12,
							}
						},
						required: true,
						readonly: isDisabled,
						items: lookupItems,
					},
					{
						name: "password",
						label: { caption: "Password" },
						type: "password",
						viewConfig: {
							layout: {
								column: 0,
								row: 6,
								columnSpan: 12,
							}
						},
						required: true,
						readonly: isDisabled,
					},
					{
						name: "color",
						label: { caption: "Color" },
						type: "color",
						viewConfig: {
							layout: {
								column: 0,
								row: 7,
								columnSpan: 12,
							}
						},
						required: true,
						readonly: isDisabled,
					},
				]}
			/>

			<hr />
			<h5 className="subtitle is-5">
				Result
			</h5>
			<pre>{result}</pre>
			<hr />
			<h5 className="subtitle is-5">
				Code
			</h5>
			<pre>{`<Form
name="test"
caption="Test form"
onSubmit={onSubmit}
submitButtonConfiguration={{
	type: "success",
	caption: "Save",
	disabled: isDisabled
}}
items={[
	{
		name: "text",
		label: { caption: "Text" },
		type: "text",
		viewConfig: {
			layout: {
				column: 0,
				row: 0,
				columnSpan: 12,
			}
		},
		required: true,
		readonly: isDisabled,
	},
	{
		name: "multiline",
		label: { caption: "Multiline" },
		type: "multiline",
		viewConfig: {
			layout: {
				column: 0,
				row: 1,
				columnSpan: 12,
			}
		},
		required: true,
		readonly: isDisabled,
	},
	{
		name: "checkbox",
		label: { caption: "Checkbox" },
		type: "checkbox",
		viewConfig: {
			layout: {
				column: 0,
				row: 2,
				columnSpan: 12,
			}
		},
		required: true,
		readonly: isDisabled,
	},
	{
		name: "number",
		label: { caption: "Number with default value" },
		type: "number",
		viewConfig: {
			layout: {
				column: 0,
				row: 3,
				columnSpan: 12,
			}
		},
		defaultValue: 42,
		required: true,
		readonly: isDisabled,
	},
	{
		name: "date",
		label: { caption: "Late" },
		type: "date",
		viewConfig: {
			layout: {
				column: 0,
				row: 4,
				columnSpan: 12,
			}
		},
		required: true,
		readonly: isDisabled,
	},
	{
		name: "lookup",
		label: { caption: "Lookup" },
		type: "lookup",
		viewConfig: {
			layout: {
				column: 0,
				row: 5,
				columnSpan: 12,
			}
		},
		required: true,
		readonly: isDisabled,
		items: lookupItems,
	},
	{
		name: "password",
		label: { caption: "password" },
		type: "password",
		viewConfig: {
			layout: {
				column: 0,
				row: 6,
				columnSpan: 12,
			}
		},
		required: true,
		readonly: isDisabled,
	},
	{
		name: "color",
		label: { caption: "color" },
		type: "color",
		viewConfig: {
			layout: {
				column: 0,
				row: 7,
				columnSpan: 12,
			}
		},
		required: true,
		readonly: isDisabled,
	},
]}
/>`}</pre>
		</div>
	);
}

export default App;
