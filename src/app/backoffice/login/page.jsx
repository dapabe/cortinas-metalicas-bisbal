"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DashboardPasswordSchema } from "#/schemas/DashboardPassword.schema";

export default function Page() {
	const {
		register,
		formState: { isSubmitting, errors },
		handleSubmit,
	} = useForm({
		defaultValues: {
			password: "",
		},
		resolver: zodResolver(DashboardPasswordSchema),
	});

	const onSubmit = (data) => {};

	return (
		<div className="flex items-center justify-center h-full">
			<div className="card w-96 max-w-md shadow-md">
				<form className="card-body" onSubmit={handleSubmit(onSubmit)}>
					<h2 className="card-title">Iniciar Sesión</h2>

					<fieldset className="fieldset">
						<legend className="fieldset-legend">Contraseña</legend>
						<input {...register("password")} type="text" className="input" />
						<p className="label">{errors?.password}</p>
					</fieldset>

					<div className="card-actions justify-end">
						<button type="submit" className="btn btn-info">
							Ingresar
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
