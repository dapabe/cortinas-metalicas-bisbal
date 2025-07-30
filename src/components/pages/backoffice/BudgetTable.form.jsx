import { BudgetConfig } from "#/constants/budget.config";
import { useBudgetStore } from "#/stores/budget.store";
import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import {
	FormProvider,
	useFieldArray,
	useForm,
	useFormContext,
} from "react-hook-form";

/**
 * @typedef {Object} IBudgetForm
 * @property {IBudgetItem[]} list
 */

export function BudgetTableForm() {
	const budget = useBudgetStore();
	const { control, register, handleSubmit } = useForm({
		/** @type {IBudgetForm} */
		defaultValues: {
			list: [],
		},
	});
	const arr = useFieldArray({
		control,
		name: "list",
	});

	/**	@param {IBudgetForm} data */
	const onSubmit = (data) => {
		budget.generatePDF(data.list);
	};

	useEffect(() => {
		if (!arr.fields.length) {
			arr.append({ description: "", quantity: 1, price: 0 });
		}
	}, []);

	return (
		<form
			className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100"
			onSubmit={handleSubmit(onSubmit)}
		>
			<table className="table">
				<thead>
					<tr>
						<th colSpan={2}></th>
						<th colSpan={2}>
							<button type="submit" className="btn btn-success">
								Descargar PDF
							</button>
						</th>
					</tr>
					<tr className="[&>th]:text-center">
						<th>{BudgetConfig.Titles.Description}</th>
						<th>{BudgetConfig.Titles.Quantity}</th>
						<th>{BudgetConfig.Titles.UnitPrice}</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{arr.fields.map((field, index) => (
						<tr key={field.id}>
							<td>
								<textarea
									{...register(`list.${index}.description`)}
									className="textarea textarea-sm resize-none"
								/>
							</td>
							<td>
								<div className="join">
									<button
										className="btn btn-sm join-item rounded-l-full"
										onClick={() =>
											arr.update(index, {
												...field,
												quantity: parseInt(field.quantity) - 1,
											})
										}
									>
										-
									</button>
									<input
										type="number"
										{...register(`list.${index}.quantity`)}
										className="input input-sm join-item w-12"
									/>
									<button
										className="btn btn-sm join-item rounded-r-full"
										onClick={() =>
											arr.update(index, {
												...field,
												quantity: parseInt(field.quantity) + 1,
											})
										}
									>
										+
									</button>
								</div>
							</td>
							<td>
								<label className="input input-sm w-32">
									<span className="label">$</span>
									<input type="number" {...register(`list.${index}.price`)} />
								</label>
							</td>
							<td>
								<button
									type="button"
									className="btn btn-sm btn-block btn-error"
									onClick={() => arr.remove(index)}
								>
									<XMarkIcon className="size-6" />
								</button>
							</td>
						</tr>
					))}
					{arr.fields.length ? (
						<tr>
							<td colSpan={3}></td>
							<td>
								Total:{" "}
								<span className="font-mono font-semibold">
									${budget.calculateTotal(arr.fields)}
								</span>
							</td>
						</tr>
					) : null}
					<tr>
						<td colSpan={3} className="text-center">
							<button
								className="btn btn-block"
								onClick={() =>
									arr.append({ description: "", quantity: 1, price: 0 })
								}
							>
								<PlusCircleIcon className="inline size-6" />
								Nuevo Item
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</form>
	);
}
