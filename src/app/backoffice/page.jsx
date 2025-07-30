"use client";

import { BudgetTableForm } from "#/components/pages/backoffice/BudgetTable.form";
import { useBudgetStore } from "#/stores/budget.store";

export default function Page() {
	const { generatePDF } = useBudgetStore();

	return (
		<div className="flex-1 flex items-center justify-center h-full">
			<section className="max-w-3xl w-full">
				<BudgetTableForm />
			</section>
		</div>
	);
}
