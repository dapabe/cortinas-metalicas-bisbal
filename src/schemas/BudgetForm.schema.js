import z3 from "zod";

const BudgetItemSchema = z3.object({
	id: z3.string(),
	description: z3.string().trim().min(3),
	price: z3.coerce.number().min(0),
	quantity: z3.coerce.number().min(1),
	discount: z3.coerce.number().min(0).max(100),
	subtotal: z3.coerce.number().min(0),
});

export const BudgetFormSchema = z3.object({
	_onlyShowTotal: z3.boolean(),
	createdAt: z3.coerce.date(),
	validUntil: z3.coerce.date().nullable(),
	clientName: z3.string().trim().min(3),
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
 *  @typedef {z3.infer<typeof BudgetFormSchema>} IBudgetForm
 */
