import z3 from "zod";

const sch = z3
	.string({ message: "El nombre debe ser texto" })
	.trim()
	.min(3, { message: "Minimo 3 caracteres" });
export const MessageReviewSchema = z3.object({
	name: sch,
	message: sch,
});
