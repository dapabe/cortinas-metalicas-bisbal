"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageReviewSchema } from "#/schemas/MessageReview.schema";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { twJoin } from "tailwind-merge";
import { useApiStore } from "#/stores/api.store";

export function MessageReviewForm() {
	const Api = useApiStore();

	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: {
			name: "",
			message: "",
		},
		resolver: zodResolver(MessageReviewSchema),
	});

	/** @param {import("#/schemas/MessageReview.schema").IMessageReview} data*/
	const onSubmit = async (data) => {
		await Api.SendReview(data);
	};
	return (
		<form
			className="card shadow-md w-full max-w-sm"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="card-body">
				<fieldset className="fieldset">
					<legend className="fieldset-legend">
						Nombre <span className="text-error">*</span>
					</legend>
					<input
						{...register("name")}
						placeholder="ej: Don José"
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
						Reseña <span className="text-error">*</span>
					</legend>
					<textarea
						{...register("message")}
						placeholder="El trabajo que hicieron en mi negocio.."
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
					<button
						type="submit"
						disabled={isSubmitting}
						className={"btn btn-info"}
					>
						{isSubmitting ? (
							<span className="loading loading-dots loading-md"></span>
						) : (
							<>
								Enviar Mensaje
								<PaperAirplaneIcon className="size-6" />
							</>
						)}
					</button>
				</div>
			</div>
		</form>
	);
}
