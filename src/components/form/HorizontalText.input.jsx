import { useFormContext } from "react-hook-form";

/**
 * @component
 * @param {{
 *  label: string
 *  isRequired?: boolean
 *  inputName: string
 * }} props
 */
export function HorizontalTextInput({ label, isRequired = false, inputName }) {
	const { register, formState } = useFormContext();

	return (
		<label
			aria-invalid={!!formState.errors[inputName] ? "true" : undefined}
			className="input aria-[invalid]:input-error"
		>
			<span className="label">
				{label}
				{isRequired ? <span className="text-error">*</span> : null}
			</span>
			<input type="text" {...register(inputName)} />
		</label>
	);
}
