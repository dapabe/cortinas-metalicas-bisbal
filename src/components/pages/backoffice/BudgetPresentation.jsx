import {
	EnvelopeIcon,
	GlobeAltIcon,
	PhoneIcon,
} from "@heroicons/react/24/outline";

/**
 * @component
 * @param {import("react").PropsWithChildren} props
 */
export function BudgetPresentation({ children }) {
	return <article className=" outline outline-neutral">{children}</article>;
}

BudgetPresentation.Heading = function Heading() {
	return (
		<header className="navbar bg-neutral text-neutral-content">
			<nav>
				<h1 className="text-2xl font-bold mb-4">Cortinas Metálicas Bisbal</h1>
				<ul className="flex text-sm space-x-4 [&_li]:flex [&_li]:items-center [&_li]:gap-x-1.5">
					<li>
						<PhoneIcon className="size-4 inline" />
						<span>+54 9 11269 42624</span>
					</li>
					<li>
						<EnvelopeIcon className="size-4 inline" />
						<span>bisbalcristian70@gmail.com</span>
					</li>
					<li>
						<GlobeAltIcon className="size-4 inline" />
						<span>www.cortinasbisbal.com.ar</span>
					</li>
				</ul>
			</nav>
		</header>
	);
};

/**
 * @component
 * @param {import("react").PropsWithChildren} props
 */
BudgetPresentation.Main = function Main({ children }) {
	return <main className="p-4 ">{children}</main>;
};
/**
 * @component
 * @param {import("react").PropsWithChildren} props
 */
BudgetPresentation.InputItem = function InputItem({ label, children }) {
	return (
		<fieldset className="fieldset">
			<legend className="fieldset-legend">What is your name?</legend>
			<input type="text" className="input" placeholder="Type here" />
			<p className="label">Optional</p>
		</fieldset>
	);
};

BudgetPresentation.Footer = function Footer() {
	return (
		<footer className="footer footer-center p-4 border-t border-accent/50 ">
			<div>
				<p>
					© {new Date().getFullYear()} Cortinas Metálicas Bisbal | Especialistas
					en cortinas metálicas, motorizaciones y automatizaciones.
				</p>
			</div>
		</footer>
	);
};
