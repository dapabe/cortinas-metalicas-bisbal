"use client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DashboardPasswordSchema } from "#/schemas/DashboardPassword.schema";
import { useToastStore } from "#/stores/toaster.store";
import { useRouter } from "next/navigation";
import { VerticalTextInput } from "#/components/form/VerticalText.input";
import { useApiStore } from "#/stores/api.store";

export default function Page() {
	const Api = useApiStore();
	const router = useRouter();

	const methods = useForm({
		defaultValues: {
			password: "",
		},
		resolver: zodResolver(DashboardPasswordSchema),
	});

	/** @param {import("#/schemas/DashboardPassword.schema").IDashboardPassword} data */
	const onSubmit = async (data) => {
		const isOk = await Api.LogIn(data);
		if (isOk) return router.push("/backoffice");
	};

	return (
		<div className="flex items-center justify-center h-full">
			<div className="card w-96 max-w-md shadow-md">
				<FormProvider {...methods}>
					<form className="card-body" onSubmit={methods.handleSubmit(onSubmit)}>
						<h2 className="card-title">Iniciar Sesión</h2>

						<VerticalTextInput
							label="Contraseña"
							inputName="password"
							isPassword
							isRequired
						/>

						<div className="card-actions justify-end">
							<button
								type="submit"
								disabled={methods.formState.isSubmitting}
								className={"btn btn-info"}
							>
								{methods.formState.isSubmitting ? (
									<span className="loading loading-dots loading-md"></span>
								) : (
									<>Ingresar</>
								)}
							</button>
						</div>
					</form>
				</FormProvider>
			</div>
		</div>
	);
}
