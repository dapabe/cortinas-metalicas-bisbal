export const TourStepID = {
	_1: "step1",
	_2: "step2",
	_3: "step3",
	_4: "step4",
	_5: "step5",
};

/** @type {import("@reactour/tour").StepType[]} */
export const TourSteps = [
	{
		selector: `#${TourStepID._1}`,
		content: () => (
			<p>
				Los campos que tengan este asterisco en rojo (
				<span className="text-error">*</span>) son obligatorios de rellenar.{" "}
			</p>
		),
	},
	{
		selector: `#${TourStepID._2}`,
		content: () => (
			<p>
				Si el mismo campo esta marcado en{" "}
				<span className="text-error">rojo</span> entonces es invalido. <br />
				No podras generar el documento hasta que arregles el error.
			</p>
		),
	},
	{
		selector: `#${TourStepID._3}`,
		content: () => (
			<p>
				Los items de la lista pueden eliminarse con el botón{" "}
				<button className="btn btn-error">X</button> de la derecha.
			</p>
		),
	},
	{
		selector: `#${TourStepID._4}`,
		content: () => <p>No olvides asignar el total, aunque sea opcional.</p>,
	},
	{
		selector: `#${TourStepID._5}`,
		content: () => <p>Aquí podras previsualizar o descargar el archivo PDF.</p>,
	},
];
