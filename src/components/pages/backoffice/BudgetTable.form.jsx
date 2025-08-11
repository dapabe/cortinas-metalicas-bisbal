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
import { HorizontalTextInput } from "#/components/form/HorizontalText.input";

export function BudgetTableForm() {
	const budget = useBudgetStore();
	const methods = useForm({
		/** @type {import("#/schemas/BudgetForm.schema").IBudgetForm} */
		defaultValues: {
			_onlyShowTotal: true,
			createdAt: new Date().toISOString().split("T")[0],
			validUntil: null,
			clientName: "",
			clientLocation: "",
			clientContact: "",
			clientID: "",
			list: [],
			total: "0",
			notes: "Ninguna",
			warranty: "De 1 año.",
			workCompletion:
				"En todo caso de requerir el trabajo se debe abonar con anticipación el 60% y el 40% restante al finalizar el trabajo.",
			important:
				"Los trabajos de electricidad no los realizamos, contrate al electricista.",
		},
		resolver: zodResolver(BudgetFormSchema),
	});

	/**	@param {import("#/schemas/BudgetForm.schema").IBudgetForm} data */
	const onSubmit = (data) => {
		budget.generatePDF(data);
	};

	return (
		<FormProvider {...methods}>
			<form
				className="flex flex-col gap-4"
				onSubmit={methods.handleSubmit(onSubmit)}
			>
				<section className="grid gap-4 grid-cols-4">
					<fieldset className="col-span-4 md:col-span-2 fieldset bg-base-200 p-4 rounded-box w-fit mx-auto">
						<legend className="fieldset-legend text-lg">
							Datos del cliente
						</legend>

						<div className="flex gap-2 flex-col lg:flex-row">
							<HorizontalTextInput
								label="Nombre/Razón Social"
								isRequired
								inputName="clientName"
							/>
							<HorizontalTextInput
								label="Dirección"
								inputName="clientLocation"
							/>
						</div>
						<div className="flex gap-2 flex-col lg:flex-row">
							<HorizontalTextInput label="Contacto" inputName="clientContact" />
							<HorizontalTextInput label="CUIT/CUIL/DNI" inputName="clientID" />
						</div>
					</fieldset>

					<fieldset className="col-span-4 md:col-span-2 lg:col-span-1 fieldset bg-base-200 p-4 rounded-box m-auto">
						<legend className="fieldset-legend text-lg">
							Fechas del presupuesto
						</legend>

						<div className="flex gap-2 flex-col">
							<label className="input">
								<span className="label">
									Creado el
									<span className="text-error">*</span>
								</span>
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
									// min={new Date().toISOString().split("T")[0]}
									{...methods.register("validUntil")}
								/>
							</label>
						</div>
					</fieldset>

					<fieldset className="col-span-4 md:col-span-2 fieldset bg-base-200 p-4 rounded-box">
						<legend className="fieldset-legend text-lg">
							Términos y Condiciones
						</legend>
						<div className="flex flex-col w-full gap-2">
							<HorizontalTextInput label="Garantía" inputName="warranty" />
							<HorizontalTextInput
								label="Condición de trabajo"
								inputName="workCompletion"
							/>
							<HorizontalTextInput label="Importante" inputName="important" />
						</div>
					</fieldset>

					<fieldset className="col-span-4 md:col-span-2 md:col-start-3 fieldset bg-base-200 p-4 rounded-box">
						<legend className="fieldset-legend text-lg">
							Notas Adicionales
						</legend>
						<textarea
							className="textarea resize-none w-full"
							{...methods.register("notes")}
						></textarea>
					</fieldset>

					<div className="col-span-full lg:col-span-1 lg:row-start-1 lg:col-start-4 p-4 flex items-center justify-center mx-auto">
						<button type="submit" className="btn btn-success">
							Descargar PDF
						</button>
					</div>
				</section>

				<div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
					<table className="table">
						<thead>
							{/* <tr> */}
							{/* <th>
									<label className="label">
										<input
											type="checkbox"
											className="checkbox"
											{...methods.register("_onlyShowTotal")}
										/>
										Modificar solo el resumen final
									</label>
								</th> */}
							{/* <th colSpan={1}></th> */}
							{/* </tr> */}
							<tr className="[&>th]:text-center">
								<th>{BudgetConfig.TableHeader.Description}</th>
								<th>{BudgetConfig.TableHeader.Quantity}</th>
								<th>{BudgetConfig.TableHeader.UnitPrice}</th>
								<th>{BudgetConfig.TableHeader.Discount}</th>
								<th>{BudgetConfig.TableHeader.Subtotal}</th>
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
			// for (let index = 0; index < 30; index++) {
			arr.append({
				description: "",
				quantity: "1",
				price: "0",
				discount: "0",
				subtotal: "0",
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

	/** @type {import("#/schemas/BudgetForm.schema").IBudgetItem[]} */
	const formList = useWatch({ control, name: "list" });
	/** @type {boolean} */
	const _onlyShowTotal = useWatch({ control, name: "_onlyShowTotal" });

	const displayedTotal = useMemo(
		() => budget.calculateTotal(formList),
		[formList]
	);

	// useEffect(() => {
	// 	if (!_onlyShowTotal && formList.length)
	// 		setValue("total", displayedTotal.toString());
	// 	return () => setValue("total", displayedTotal.toString());
	// }, [_onlyShowTotal, formList]);

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
				className="btn btn-block btn-info"
				onClick={() =>
					append({
						description: "",
						quantity: "1",
						price: "0",
						discount: "0",
						subtotal: "0",
					})
				}
			>
				<PlusCircleIcon className="inline size-6" />
				Nuevo Item
			</button>
		</td>
	);
};
