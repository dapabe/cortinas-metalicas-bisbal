import z3 from "zod";

const MinTextSchema = z3
	.string()
	.trim()
	.min(3, { message: "Minimo de 3 caracteres" });
const MaxTextSchema = z3
	.string()
	.trim()
	.max(38, { message: "Maximo de 38 caracteres" });

const BudgetItemSchema = z3.object({
	id: z3.string().optional(),
	description: z3.string().optional(),
	price: z3.coerce.number().min(0),
	quantity: z3.coerce.number().min(1),
	discount: z3.coerce.number().min(0).max(100),
	subtotal: z3.coerce.number().min(0),
});

export const BudgetFormSchema = z3
	.object({
		_onlyShowTotal: z3.boolean(),
		createdAt: z3.coerce.date().default(),
		validUntil: z3.coerce.date().nullable(),
		clientName: MinTextSchema.max(38, { message: "Maximo de 38 caracteres" }),
		clientLocation: MaxTextSchema.optional(),
		clientContact: MaxTextSchema.optional(),
		clientID: MaxTextSchema.optional(),
		list: BudgetItemSchema.array(),
		total: z3.coerce.number().min(0),
		notes: z3.string().optional(),
		warranty: z3.string().optional(),
		workCompletion: z3.string().optional(),
		important: z3.string().optional(),
	})
	.refine(
		(data) => {
			if (data.validUntil)
				return !(data.validUntil.getTime() < data.createdAt.getTime());
			return true;
		},

		{
			message: "No puede ser menor a la fecha de creación",
			path: ["validUntil"],
		}
	);

/**
 * 	@typedef {z3.infer<typeof BudgetItemSchema>} IBudgetItem
 */

/**
 *  @typedef {z3.infer<typeof BudgetFormSchema>} IBudgetForm
 */
