import { BudgetTableForm } from "#/components/pages/backoffice/BudgetTable.form";

export default function Page() {
	return (
		<div className="flex-1 flex flex-col items-center justify-center h-full">
			<section className="max-w-7xl w-full">
				<h2 className="text-xl mr-auto font-bold	 decoration-2 underline underline-offset-2">
					Generador de Presupuestos
				</h2>
				<BudgetTableForm />
			</section>
		</div>
	);
}
