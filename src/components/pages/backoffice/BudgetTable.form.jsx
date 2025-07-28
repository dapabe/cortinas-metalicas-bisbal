import { BudgetConfig } from "#/constants/budget.config";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useFieldArray, useFormContext } from "react-hook-form";

/**
 * @component
 * @param {import("react").PropsWithChildren} props
 */
export function BudgetTableForm({ children }) {
	return (
		<div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
			<table className="table">
				<thead>
					<tr>
						<th>{BudgetConfig.Titles.Description}</th>
						<th>{BudgetConfig.Titles.Quantity}</th>
						<th>{BudgetConfig.Titles.UnitPrice}</th>
					</tr>
				</thead>
				<tbody>{children}</tbody>
			</table>
		</div>
	);
}

BudgetTableForm.AutoItemRow = function AutoItemRow() {
	const { control, register } = useFormContext();
	const { fields } = useFieldArray({
		control,
		name: "list",
	});

	return fields.map((field, index) => (
		<tr key={field.id}>
			<td>
				<input {...register(`list.${index}.desc`)} />
			</td>
			<td>
				<input {...register(`list.${index}.quantity`)} />
			</td>
			<td>
				<input {...register(`list.${index}.price`)} />
			</td>
		</tr>
	));
};

/**
 * @component
 * @param {{onClick: ()=> void}} props
 */
BudgetTableForm.AddRow = function AddRow({ onClick }) {
	return (
		<tr>
			<td
				colSpan={Object.keys(BudgetConfig.Titles).length}
				className="text-center"
			>
				<button className="btn btn-block" onClick={onClick}>
					<PlusCircleIcon className="inline size-6" />
					Nuevo Item
				</button>
			</td>
		</tr>
	);
};
