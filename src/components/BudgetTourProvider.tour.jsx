import { TourSteps } from "#/constants/tour.steps";
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { useTour } from "@reactour/tour";
import { TourProvider } from "@reactour/tour";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { useState } from "react";

/**
 * @component
 * @param {import("react").PropsWithChildren} props
 */
export function BudgetTourProvider({ children }) {
	const [currentStep, setCurrentStep] = useState(0);
	const radius = 10;
	const disableBody = (target) => disableBodyScroll(target);
	const enableBody = (target) => enableBodyScroll(target);

	return (
		<TourProvider
			steps={TourSteps}
			scrollSmooth
			disableDotsNavigation
			disableKeyboardNavigation={["esc"]}
			showCloseButton={false}
			showDots={false}
			afterOpen={disableBody}
			beforeClose={enableBody}
			onClickHighlighted={(e) => {
				e.stopPropagation();
			}}
			disableInteraction
			styles={{
				popover: (base) => ({
					...base,
					borderRadius: radius,
				}),
				maskArea: (base) => ({
					...base,
					rx: radius,
				}),
			}}
			// setCurrentStep={() => {
			// 	if (currentStep === steps.length - 1) {
			// 		setCurrentStep(0);
			// 	} else {
			// 		setCurrentStep(currentStep + 1);
			// 	}
			// }}
			prevButton={(props) => {
				const first = props.currentStep === 0;
				return (
					<button
						disabled={first}
						type="button"
						className="btn"
						onClick={() => props.setCurrentStep((s) => s - 1)}
					>
						<ChevronLeftIcon className="size-6" />
					</button>
				);
			}}
			nextButton={(props) => {
				const isLast = props.currentStep === props.stepsLength - 1;
				const nextStep = () =>
					props.setCurrentStep((s) =>
						s === props.stepsLength - 1 ? 0 : s + 1
					);
				if (isLast)
					return (
						<button
							type="button"
							className="btn btn-outline"
							onClick={() => {
								props.setIsOpen(false);
								props.setCurrentStep(0);
							}}
						>
							Cerrar
						</button>
					);
				return (
					<button type="button" className="btn" onClick={nextStep}>
						<ChevronRightIcon className="size-6" />
					</button>
				);
			}}
		>
			{children}
		</TourProvider>
	);
}

BudgetTourProvider.TutorialButton = function Button() {
	const { setIsOpen } = useTour();
	return (
		<button
			type="button"
			className="btn btn-info"
			onClick={() => setIsOpen(true)}
		>
			Como usar
			<InformationCircleIcon className="size-6" />
		</button>
	);
};
