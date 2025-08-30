import { useFormContext } from "react-hook-form";

/**
 * @component
 * @param {{
 *  label: string
 *  isRequired?: boolean
 *  inputName: string
 * } & HTMLInputElement} props
 */
export function DateInput({ inputName, label, isRequired = false, ...rest }) {
	const { register, formState } = useFormContext();

	return (
		<fieldset className="fieldset">
			<legend className="fieldset-legend">
				{label}
				{isRequired ? <span className="text-error">*</span> : null}
			</legend>
			<input
				type="date"
				aria-invalid={!!formState.errors[inputName] ? "true" : undefined}
				className="input aria-[invalid]:input-error w-full"
				{...rest}
				{...register(inputName)}
			/>
			<p className="label text-error">{formState.errors[inputName]?.message}</p>
		</fieldset>
	);
}
