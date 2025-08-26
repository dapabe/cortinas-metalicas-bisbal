import { useFormContext } from "react-hook-form";

/**
 * @component
 * @param {{
 *  label: string
 *  isRequired?: boolean
 *  inputName: string
 * }} props
 */
export function VerticalTextInput({ label, isRequired = false, inputName }) {
	const { register, formState } = useFormContext();

	return (
		<fieldset className="fieldset w-full">
			<legend className="fieldset-legend">
				{label}
				{isRequired ? <span className="text-error">*</span> : null}
			</legend>
			<input
				type="text"
				aria-invalid={!!formState.errors[inputName] ? "true" : undefined}
				className="input aria-[invalid]:input-error w-full"
				{...register(inputName)}
			/>
			<p className="label text-error">{formState.errors[inputName]?.message}</p>
		</fieldset>
	);
}
