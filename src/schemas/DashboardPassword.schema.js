import z3 from "zod";
import z from "zod";

export const DashboardPasswordSchema = z.object({
	password: z.string().trim().min(1, "La contraseña es requerida"),
});

/**
 * 	@typedef {z3.infer<typeof DashboardPasswordSchema>} IDashboardPassword
 */
