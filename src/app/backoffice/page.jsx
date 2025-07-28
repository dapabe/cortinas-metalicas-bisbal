"use client";

import { BudgetTableForm } from "#/components/pages/backoffice/BudgetTable.form";
import { useBudgetStore } from "#/stores/budget.store";
import { FormProvider } from "react-hook-form";

export default function Page() {
	const { generatePDF } = useBudgetStore();

	return (
		<div className="flex-1 flex items-center justify-center h-full">
			<section className="flex flex-col gap-4">
				<div className="self-end print:hidden">
					<button className="btn" onClick={generatePDF}>
						Imprimir
					</button>
				</div>
				<FormProvider
					handleSubmit={(values) => {
						console.log(values());
					}}
				>
					<BudgetTableForm>
						<BudgetTableForm.AutoItemRow />
						<BudgetTableForm.AddRow
							onClick={() => {
								console.log("Agregar Item");
							}}
						/>
					</BudgetTableForm>
				</FormProvider>
			</section>
		</div>
	);
}
