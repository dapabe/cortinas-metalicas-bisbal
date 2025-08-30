"use client";
import dynamic from "next/dynamic";

const BudgetTableForm = dynamic(
	() =>
		import("../../components/pages/backoffice/BudgetTable.form").then(
			(mod) => mod.BudgetTableForm
		),
	{
		ssr: false,
		loading: () => <span className="loading loading-dots loading-md"></span>,
	}
);

export default function Page() {
	return (
		<div className="h-full">
			<section className="max-w-7xl mx-auto w-full">
				<h2 className="text-xl mr-auto font-bold decoration-2 underline underline-offset-2">
					Generador de Presupuestos
				</h2>
				<BudgetTableForm />
			</section>
		</div>
	);
}
