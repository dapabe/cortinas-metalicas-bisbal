import { BudgetConfig } from "#/constants/budget.config";
import { useBudgetStore } from "#/stores/budget.store";
import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import {
	FormProvider,
	useFieldArray,
	useForm,
	useFormContext,
	useWatch,
} from "react-hook-form";

/**
 * @typedef {Object} IBudgetForm
 * @property {boolean} _onlyShowTotal
 * @property {IBudgetItem[]} list
 * @property {number} total
 */

export function BudgetTableForm() {
	const budget = useBudgetStore();
	const methods = useForm({
		/** @type {IBudgetForm} */
		defaultValues: {
			_onlyShowTotal: false,
			list: [],
			total: 0,
		},
	});

	/**	@param {IBudgetForm} data */
	const onSubmit = (data) => {
		budget.generatePDF(data);
	};

	return (
		<FormProvider {...methods}>
			<form
				className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100"
				onSubmit={methods.handleSubmit(onSubmit)}
			>
				<table className="table">
					<thead>
						<tr>
							<th>
								<label className="label">
									<input
										type="checkbox"
										className="checkbox"
										{...methods.register("_onlyShowTotal")}
									/>
									Modificar solo el resumen final
								</label>
							</th>
							<th colSpan={3}></th>
							<th colSpan={1}>
								<button type="submit" className="btn btn-success">
									Descargar PDF
								</button>
							</th>
						</tr>
						<tr className="[&>th]:text-center">
							<th>{BudgetConfig.Titles.Description}</th>
							<th>{BudgetConfig.Titles.Quantity}</th>
							<th>{BudgetConfig.Titles.UnitPrice}</th>
							<th>{BudgetConfig.Titles.Subtotal}</th>
							<th></th>
						</tr>
					</thead>
					<BudgetTableForm.ItemList />
					<tfoot>
						<tr>
							<BudgetTableForm.TableResult />
						</tr>
						<tr>
							<BudgetTableForm.AddItem />
						</tr>
					</tfoot>
				</table>
			</form>
		</FormProvider>
	);
}

BudgetTableForm.ItemList = function ItemList() {
	const { control } = useFormContext();
	const arr = useFieldArray({
		control: control,
		name: "list",
	});

	const list = useWatch({
		control: control,
		name: "list",
	});

	useEffect(() => {
		if (!list.length) {
			arr.append({ description: "", quantity: 1, price: 0 });
		}
	}, []);

	return (
		<tbody>
			{list.map((_, index) => (
				<BudgetTableForm.RowItem key={index} index={index} />
			))}
		</tbody>
	);
};

/**
 * @component
 * @param {{index: number }} props
 */
BudgetTableForm.RowItem = function RowItem({ index }) {
	const { register } = useFormContext();

	return (
		<tr>
			<td>
				<textarea
					{...register(`list.${index}.description`)}
					className="textarea textarea-sm min-w-32 resize-none"
				/>
			</td>
			<td>
				<BudgetTableForm.InputQuantity index={index} />
			</td>
			<td>
				<BudgetTableForm.InputPrice index={index} />
			</td>
			<td>
				<BudgetTableForm.RowTotal index={index} />
			</td>
			<td>
				<BudgetTableForm.RemoveItem index={index} />
			</td>
		</tr>
	);
};

/**
 * @component
 * @param {{index: number }} props
 */
BudgetTableForm.InputQuantity = function InputQuantity({ index }) {
	const { register, getValues, setValue } = useFormContext();

	const quantity = getValues(`list.${index}.quantity`);

	return (
		<div className="join">
			<button
				type="button"
				className="btn btn-sm join-item rounded-l-full"
				disabled={quantity <= 1}
				onClick={() => {
					const newValue = Math.max(1, parseInt(quantity) - 1);
					setValue(`list.${index}.quantity`, newValue);
				}}
			>
				-
			</button>
			<input
				type="number"
				inputMode="numeric"
				min={1}
				{...register(`list.${index}.quantity`)}
				className="join-item input input-sm invalid:input-error w-12"
			/>
			<button
				type="button"
				className="btn btn-sm join-item rounded-r-full"
				onClick={() => {
					const newValue = parseInt(quantity) + 1;
					setValue(`list.${index}.quantity`, newValue);
				}}
			>
				+
			</button>
		</div>
	);
};

BudgetTableForm.InputPrice = function InputPrice({ index }) {
	const { control, register } = useFormContext();

	/** @type {boolean} */
	const _onlyShowTotal = useWatch({ control, name: "_onlyShowTotal" });

	/** @type {number} */
	const value = useWatch({ control, name: `list.${index}.price` });

	if (_onlyShowTotal) return "-";

	return (
		<label
			aria-invalid={value < 0 ? "true" : undefined}
			className="input input-sm aria-[invalid]:input-error w-32"
		>
			<span className="label">$</span>
			<input
				type="number"
				inputMode="numeric"
				min={0}
				{...register(`list.${index}.price`)}
			/>
		</label>
	);
};

BudgetTableForm.RowTotal = function RowTotal({ index }) {
	const budget = useBudgetStore();
	const { control } = useFormContext();

	/** @type {IBudgetForm} */
	const form = useWatch({
		control: control,
	});

	return (
		<div className="text-center max-w-40 truncate">
			<span className="font-mono font-semibold">
				{form._onlyShowTotal
					? "-"
					: budget.formatCurrency(
							form.list[index].quantity * form.list[index].price
					  )}
			</span>
		</div>
	);
};

/**
 * @component
 * @param {{index: number}} props
 */
BudgetTableForm.RemoveItem = function RemoveItem({ index }) {
	const { control } = useFormContext();
	const arr = useFieldArray({
		control,
		name: "list",
	});

	/**	@type {IBudgetItem[]} */
	const items = useWatch({ control, name: "list" });

	return (
		<button
			type="button"
			disabled={items.length <= 1}
			className="btn btn-sm btn-block btn-error"
			onClick={() => arr.remove(index)}
		>
			<XMarkIcon className="size-6" />
		</button>
	);
};

BudgetTableForm.TableResult = function TableResult() {
	const budget = useBudgetStore();
	const { control, register, setValue } = useFormContext();

	/** @type {IBudgetItem[]} */
	const formList = useWatch({ control, name: "list" });
	const _onlyShowTotal = useWatch({ control, name: "_onlyShowTotal" });

	useEffect(() => {
		const total = budget.calculateTotal(formList);
		if (!_onlyShowTotal && formList.length) setValue("total", total);

		return () => setValue("total", total);
	}, [_onlyShowTotal, formList]);

	if (!formList.length) return null;

	return (
		<td colSpan={1}>
			<label className="input input-md">
				Total:
				{_onlyShowTotal ? (
					<input
						type="number"
						inputMode="number"
						disabled={!_onlyShowTotal}
						className="grow"
						{...register("total")}
					/>
				) : (
					<span className="font-mono font-semibold">
						{budget.formatCurrency(budget.calculateTotal(formList))}
					</span>
				)}
			</label>
		</td>
	);
};

BudgetTableForm.AddItem = function AddItem() {
	const { control } = useFormContext();
	const { append } = useFieldArray({
		control,
		name: "list",
	});

	return (
		<td colSpan={"100%"} className="text-center">
			<button
				type="button"
				className="btn btn-block"
				onClick={() => append({ description: "", quantity: 1, price: 0 })}
			>
				<PlusCircleIcon className="inline size-6" />
				Nuevo Item
			</button>
		</td>
	);
};
