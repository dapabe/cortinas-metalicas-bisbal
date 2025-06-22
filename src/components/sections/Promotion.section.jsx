import { twJoin } from "tailwind-merge";
import { SectionTitle } from "../SectionTitle";
import { ReceiptPercentIcon } from "@heroicons/react/24/solid";
import { HashtagIcon } from "@heroicons/react/24/outline";
import { OpenMail } from "../OpenMail";
import { CopyPhoneNumber } from "../CopyPhoneNumber";

export function PromotionSection() {
	return (
		<section id="promo" className="container mx-auto space-y-4">
			<SectionTitle>
				¡<span className="underline decoration-primary">Aprovecha</span>{" "}
				nuestras promociones exclusivas!
			</SectionTitle>

			<div className="flex flex-col w-full items-center lg:flex-row lg:justify-evenly">
				{/* Promocion */}
				<div className="card shadow-md rounded-box">
					<div className="card-body lg:text-lg">
						<h3 className="card-title inline-flex justify-center">
							<ReceiptPercentIcon className="size-6 inline text-primary" />
							Si contratas nuestros servicios
							<ReceiptPercentIcon className="size-6 inline text-primary" />
						</h3>
						<p className="max-w-paragraph text-center">
							Te brindamos facilidades de pago; si eres comerciante puedes:
						</p>
						<table className="table text-center">
							<thead>
								<tr className="underline decoration-primary text-neutral">
									<th>
										<b>Pagar en cuotas</b>
									</th>
									<th>
										<b>Aplica a</b>
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Semanales</td>
									<td>Cortinas Nuevas</td>
								</tr>
								<tr>
									<td>Quincenales</td>
									<td>Reparaciones</td>
								</tr>
								<tr>
									<td>Mensuales</td>
									<td>Motorizaciones</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				{/* Extra contacto */}
				<div className="stats shadow stats-vertical overflow-visible">
					<div className="stat relative">
						<HashtagIcon className="size-10 lg:size-12 absolute translate-x-1/2 -bottom-4 lg:-top-4 right-1/2 lg:right-2 text-secondary" />
						<div className="stat-title text-center">
							Pedí tu presupuesto sin compromiso
						</div>
						<div className="stat-value text-center text-lg">
							<CopyPhoneNumber phoneNumber="54 9 11269 42624" />
						</div>
					</div>
					<div className="stat">
						<div className="stat-title text-center">
							Asesorate con nuestros expertos
						</div>
						<div className="stat-value text-center text-lg">
							<OpenMail email="bisbalcristian70@gmail.com" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

/**
 * @component
 * @param {import("react").PropsWithChildren<{primary?: boolean}>} props
 * @return {JSX.Element}
 */
function Emphasize({ children, primary }) {
	return (
		<b>
			<span className={twJoin(primary ? "text-primary" : "text-secondary")}>
				{children}
			</span>
		</b>
	);
}
