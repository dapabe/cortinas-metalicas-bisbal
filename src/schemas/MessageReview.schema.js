import z from "zod";

const sch = z
	.string({ message: "El nombre debe ser texto" })
	.trim()
	.min(3, { message: "Minimo 3 caracteres" });

export const MessageReviewSchema = z.object({
	name: sch,
	message: sch,
});
