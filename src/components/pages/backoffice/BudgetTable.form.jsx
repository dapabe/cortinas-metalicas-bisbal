"use client";
import { BudgetConfig } from "#/constants/budget.config";
import { useBudgetStore } from "#/stores/budget.store";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useMemo } from "react";
import {
	FormProvider,
	useFieldArray,
	useForm,
	useFormContext,
	useWatch,
} from "react-hook-form";
import { BudgetTableFormRow } from "./BudgetTable.form.Row";
import { zodResolver } from "@hookform/resolvers/zod";
import { BudgetFormSchema } from "#/schemas/BudgetForm.schema";

export function BudgetTableForm() {
	const budget = useBudgetStore();
	const methods = useForm({
		/** @type {import("#/schemas/BudgetForm.schema").IBudgetForm} */
		defaultValues: {
			_onlyShowTotal: false,
			createdAt: new Date().toISOString().split("T")[0],
			validUntil: null,
			clientName: null,
			clientLocation: null,
			clientContact: null,
			clientID: null,
			list: [],
			total: 0,
		},
		resolver: zodResolver(BudgetFormSchema),
	});

	/**	@param {IBudgetForm} data */
	const onSubmit = (data) => {
		console.log(data);
		// budget.generatePDF(data);
	};

	return (
		<FormProvider {...methods}>
			<form
				className="flex flex-col gap-4"
				onSubmit={methods.handleSubmit(onSubmit)}
			>
				<section className="flex gap-4">
					<fieldset className="fieldset bg-base-200 p-4 rounded-box w-max">
						<legend className="fieldset-legend text-lg">
							Datos del cliente
						</legend>

						<div className="flex gap-2">
							<label className="input">
								<span className="label">
									Nombre/Razón social
									<span className="text-error">*</span>
								</span>
								<input type="text" {...methods.register("clientName")} />
							</label>
							<label className="input">
								<span className="label">Dirección</span>
								<input type="text" {...methods.register("clientLocation")} />
							</label>
						</div>
						<div className="flex gap-2">
							<label className="input">
								<span className="label">Contacto</span>
								<input type="text" {...methods.register("clientContact")} />
							</label>
							<label className="input">
								<span className="label">CUIT/CUIL/DNI</span>
								<input type="text" {...methods.register("clientID")} />
							</label>
						</div>
					</fieldset>

					<fieldset className="fieldset bg-base-200 p-4 rounded-box w-max">
						<legend className="fieldset-legend text-lg">
							Fechas del presupuesto
						</legend>

						<div className="flex flex-col gap-2">
							<label className="input">
								<span className="label">Creado el</span>
								<input
									type="date"
									min={new Date().toISOString().split("T")[0]}
									{...methods.register("createdAt")}
								/>
							</label>
							<label className="input">
								<span className="label">Válido hasta</span>
								<input
									type="date"
									min={new Date().toISOString().split("T")[0]}
									{...methods.register("validUntil")}
								/>
							</label>
						</div>
					</fieldset>

					<div className="p-4 w-max flex items-center justify-center mx-auto">
						<button type="submit" className="btn btn-success">
							Descargar PDF
						</button>
					</div>
				</section>

				<div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
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
								<th colSpan={1}></th>
							</tr>
							<tr className="[&>th]:text-center">
								<th>{BudgetConfig.Titles.Description}</th>
								<th>{BudgetConfig.Titles.Quantity}</th>
								<th>{BudgetConfig.Titles.UnitPrice}</th>
								<th>{BudgetConfig.Titles.Discount}</th>
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
				</div>
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
			arr.append({
				description: "",
				quantity: 1,
				price: 0,
				discount: 0,
				subtotal: 0,
			});
		}
	}, []);

	return (
		<tbody>
			{list.map((_, index) => (
				<BudgetTableFormRow key={index} index={index} />
			))}
		</tbody>
	);
};

BudgetTableForm.TableResult = function TableResult() {
	const budget = useBudgetStore();
	const { control, register, setValue } = useFormContext();

	/** @type {IBudgetItem[]} */
	const formList = useWatch({ control, name: "list" });
	/** @type {boolean} */
	const _onlyShowTotal = useWatch({ control, name: "_onlyShowTotal" });

	const displayedTotal = useMemo(
		() => budget.calculateTotal(formList),
		[formList]
	);

	useEffect(() => {
		if (!_onlyShowTotal && formList.length) setValue("total", displayedTotal);
		return () => setValue("total", displayedTotal);
	}, [_onlyShowTotal, formList]);

	if (!formList.length) return null;

	return (
		<td colSpan={"100%"}>
			<label className="input input-md">
				Total:
				{_onlyShowTotal ? (
					<input
						type="number"
						inputMode="number"
						className="grow"
						{...register("total")}
					/>
				) : (
					<span className="font-mono font-semibold">
						{budget.formatCurrency(displayedTotal)}
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
				onClick={() =>
					append({
						description: "",
						quantity: 1,
						price: 0,
						discount: 0,
						subtotal: 0,
					})
				}
			>
				<PlusCircleIcon className="inline size-6" />
				Nuevo Item
			</button>
		</td>
	);
};
