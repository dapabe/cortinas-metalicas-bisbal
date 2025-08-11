import { rgb } from "pdf-lib";

export const BudgetConfig = {
	Titles: {
		Table: "DETALLE DE PRODUCTOS Y SERVICIOS",
		Notes: "NOTAS ADICIONALES",
		BudgetTotal: "RESUMEN DEL PRESUPUESTO",
		TsCs: "TÉRMINOS Y CONDICIONES",
	},
	TableHeader: {
		Description: "Descripción",
		Quantity: "Cantidad",
		UnitPrice: "Precio Unitario",
		Discount: "Descuento",
		Subtotal: "Subtotal",
	},
	PDF: {
		Fields: {
			createdAt: "createdAt",
			validUntil: "validUntil",
		},
		Colors: {
			SubHeaderText: rgb(0.16, 0.38, 0.6),
			SubHeaderBG: rgb(0.92, 0.94, 0.96),
		},
		FontSizes: {
			SM: 10,
			MD: 12,
			LG: 16,
		},
		LayoutSizes: {
			Margin: {
				Left: 30,
			},
		},
	},
};
