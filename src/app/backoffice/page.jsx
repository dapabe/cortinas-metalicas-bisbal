"use client";

import { BudgetTableForm } from "#/components/pages/backoffice/BudgetTable.form";

export default function Page() {
	return (
		<div className="flex-1 flex items-center justify-center h-full">
			<section className="max-w-7xl w-full">
				<BudgetTableForm />
			</section>
		</div>
	);
}
