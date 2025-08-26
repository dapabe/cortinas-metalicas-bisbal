import { useFormContext } from "react-hook-form";

/**
 * @component
 * @param {{
 *  label: string
 *  isRequired?: boolean
 *  inputName: string
 * 	wrapperEL: HTMLFieldSetElement
 * 	inputEL: HTMLInputElement
 * }} props
 */
export function VerticalTextInput({
	label,
	isRequired = false,
	inputName,
	wrapperEL,
	inputEL,
}) {
	const { register, formState } = useFormContext();

	return (
		<fieldset className="fieldset w-full" {...wrapperEL}>
			<legend className="fieldset-legend">
				{label}
				{isRequired ? <span className="text-error">*</span> : null}
			</legend>
			<input
				type="text"
				aria-invalid={!!formState.errors[inputName] ? "true" : undefined}
				className="input aria-[invalid]:input-error w-full"
				{...inputEL}
				{...register(inputName)}
			/>
			<p className="label text-error">{formState.errors[inputName]?.message}</p>
		</fieldset>
	);
}
