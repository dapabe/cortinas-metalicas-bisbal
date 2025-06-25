"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageReviewSchema } from "#/schemas/MessageReview.schema";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { twJoin } from "tailwind-merge";
import { useMemo } from "react";
import z3 from "zod";

export function MessageReviewForm() {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: "",
			message: "",
		},
		resolver: zodResolver(MessageReviewSchema),
	});

	/** @param {z3.TypeOf<typeof MessageReviewSchema>} data*/
	const onSubmit = async (data, form) => {
		await fetch("/api/send-review", {
			method: "POST",
			body: JSON.stringify(data),
		})
			.then(() => console.log("first"))
			.catch((x) => console.log(x));
	};
	return (
		<form className="card shadow-md max-w-sm" onSubmit={handleSubmit(onSubmit)}>
			<div className="card-body">
				<fieldset className="fieldset">
					<legend className="fieldset-legend">
						Nombre <span className="text-error">*</span>
					</legend>
					<input
						{...register("name")}
						className={twJoin(
							"input",
							errors?.name ? "input-error" : "input-neutral"
						)}
						autoComplete="true"
					/>
					<p className="label text-error">
						&#160;
						{errors?.name?.message}
					</p>
				</fieldset>

				<fieldset className="fieldset">
					<legend className="fieldset-legend">
						Mensaje <span className="text-error">*</span>
					</legend>
					<textarea
						{...register("message")}
						className={twJoin(
							"textarea h-24 resize-none",
							errors?.message ? "textarea-error" : "textarea-neutral"
						)}
					></textarea>
					<p className="label text-error">
						&#160;
						{errors?.message?.message}
					</p>
				</fieldset>

				<div className="card-actions justify-end">
					<button type="submit" className="btn btn-info ">
						Enviar Mensaje
						<PaperAirplaneIcon className="size-6" />
					</button>
				</div>
			</div>
		</form>
	);
}
