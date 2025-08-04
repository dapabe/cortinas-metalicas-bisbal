"use client";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useMemo } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { useBudgetStore } from "#/stores/budget.store";

/**
 * @component
 * @param {{index: number }} props
 */
export function BudgetTableFormRow({ index }) {
	return (
		<tr>
			<td>
				<BudgetTableFormRow.InputDescription index={index} />
			</td>
			<td>
				<BudgetTableFormRow.InputQuantity index={index} />
			</td>
			<td>
				<BudgetTableFormRow.InputPrice index={index} />
			</td>
			<td>
				<BudgetTableFormRow.InputDiscount index={index} />
			</td>
			<td>
				<BudgetTableFormRow.RowTotal index={index} />
			</td>
			<td>
				<BudgetTableFormRow.RemoveItem index={index} />
			</td>
		</tr>
	);
}

/**
 * @component
 * @param {{index: number }} props
 */
BudgetTableFormRow.InputDescription = function InputDescription({ index }) {
	const { control, register, setValue } = useFormContext();

	const value = useWatch({ control, name: `list.${index}.description` });

	// const [selected, setSelected] = useState(null);

	return (
		<label className="input input-md">
			<button type="button" className="label">
				<ChevronDownIcon className="size-6" />
			</button>
			{/* {value.length ? (
				<button type="button" className="btn btn-sm">
					{value}
				</button>
			) : ( */}
			<input type="text" {...register(`list.${index}.description`)} />
			{/* )} */}
		</label>
	);
};

/**
 * @component
 * @param {{index: number }} props
 */
BudgetTableFormRow.InputQuantity = function InputQuantity({ index }) {
	const { register, getValues, setValue } = useFormContext();

	const quantity = getValues(`list.${index}.quantity`);

	return (
		<div className="flex justify-center">
			<div className="join">
				<button
					type="button"
					className="btn btn-sm join-item rounded-l-full"
					disabled={quantity <= 1}
					onClick={() => {
						let newValue = Math.max(1, parseInt(quantity) - 1);
						if (isNaN(newValue)) newValue = 1;
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
						let newValue = parseInt(quantity) + 1;
						if (isNaN(newValue)) newValue = 1;
						setValue(`list.${index}.quantity`, newValue);
					}}
				>
					+
				</button>
			</div>
		</div>
	);
};

/**
 * @component
 * @param {{index: number }} props
 */
BudgetTableFormRow.InputPrice = function InputPrice({ index }) {
	const { control, register } = useFormContext();

	/** @type {boolean} */
	const _onlyShowTotal = useWatch({ control, name: "_onlyShowTotal" });

	/** @type {number} */
	const value = useWatch({ control, name: `list.${index}.price` });

	if (_onlyShowTotal) return "-";

	return (
		<div className="flex justify-center">
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
		</div>
	);
};

/**
 * @component
 * @param {{index: number }} props
 */
BudgetTableFormRow.InputDiscount = function InputDiscount({ index }) {
	const { control, register, setValue } = useFormContext();

	/** @type {number} */
	const discount = useWatch({ control, name: `list.${index}.discount` });
	/**	@type {boolean} */
	const _onlyShowTotal = useWatch({ control, name: "_onlyShowTotal" });

	if (_onlyShowTotal) return "-";

	return (
		<div className="flex justify-center">
			<div className="join">
				<button
					type="button"
					className="btn btn-sm join-item rounded-l-full"
					disabled={discount <= 0}
					onClick={() => {
						let newValue = Math.max(0, parseInt(discount) - 1);
						if (isNaN(newValue)) newValue = 0;
						setValue(`list.${index}.discount`, newValue);
					}}
				>
					-
				</button>
				<label
					aria-invalid={discount < 0 || discount > 100 ? "true" : undefined}
					className="join-item input input-sm aria-[invalid]:input-error w-22"
				>
					<input
						type="number"
						inputMode="numeric"
						min={0}
						max={100}
						{...register(`list.${index}.discount`)}
					/>
					<span className="label">%</span>
				</label>
				<button
					type="button"
					className="btn btn-sm join-item rounded-r-full"
					disabled={discount >= 100}
					onClick={() => {
						let newValue = Math.min(100, parseInt(discount) + 1);
						if (isNaN(newValue)) newValue = 0;
						setValue(`list.${index}.discount`, newValue);
					}}
				>
					+
				</button>
			</div>
		</div>
	);
};

/**
 * @component
 * @param {{index: number}} props
 */
BudgetTableFormRow.RowTotal = function RowTotal({ index }) {
	const budget = useBudgetStore();
	const { control, setValue } = useFormContext();

	/** @type {boolean} */
	const _onlyShowTotal = useWatch({ control, name: "_onlyShowTotal" });

	/**	@type {IBudgetItem} */
	const item = useWatch({ control, name: `list.${index}` });

	/**	@type {number} */
	const subtotal = useMemo(() => {
		const result = item.quantity * item.price;
		return result - (result * item.discount) / 100;
	}, [item]);

	useEffect(() => {
		setValue("subtotal", subtotal);
	}, [subtotal]);

	return (
		<div className="text-center max-w-40 truncate">
			<span className="font-mono font-semibold">
				{_onlyShowTotal ? "-" : budget.formatCurrency(subtotal)}
			</span>
		</div>
	);
};

/**
 * @component
 * @param {{index: number}} props
 */
BudgetTableFormRow.RemoveItem = function RemoveItem({ index }) {
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
