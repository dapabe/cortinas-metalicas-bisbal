import z3 from "zod";

const BudgetItemSchema = z3.object({
	description: z3.string(),
	price: z3.coerce.number().min(0),
	quantity: z3.coerce.number().min(1),
	discount: z3.coerce.number().min(0).max(100),
	subtotal: z3.coerce.number().min(0),
});

export const BudgetFormSchema = z3.object({
	createdAt: z3.coerce.date(),
	validUntil: z3.coerce.date().nullable(),
	clientName: z3.string().min(3),
	clientLocation: z3.string().optional(),
	clientContact: z3.string().optional(),
	clientID: z3.string().optional(),
	list: BudgetItemSchema.array().min(1),
	total: z3.coerce.number().min(0),
	notes: z3.string().optional(),
	warranty: z3.string().optional(),
	workCompletion: z3.string().optional(),
	important: z3.string().optional(),
});

/**
 * 	@typedef {z3.infer<typeof BudgetItemSchema>} IBudgetItem
 */

/**
 *  @typedef {Object} AUX
 *  @property {boolean} _onlyShowTotal
 */

/**
 *  @typedef {AUX & z3.infer<typeof BudgetFormSchema>} IBudgetForm
 */
