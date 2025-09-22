import { SectionDivider } from "#/components/SectionDivider";
import { SectionTitle } from "#/components/SectionTitle";
import { AnchorSectionNames } from "#/constants/AnchorSectionNames";
import { UserReviews } from "#/constants/UserReviews.data";

export function UserReviewSection() {
	return (
		<section className="container mx-auto p-4 flex flex-col gap-4 items-center">
			<SectionTitle anchorSectionName={AnchorSectionNames.Review}>
				<span className="underline decoration-primary">Reseñas</span> recientes
			</SectionTitle>

			<ul
				className="carousel yes-scrollbar w-full gap-4 px-14 py-2"
				aria-label="Reseñas de usuarios"
			>
				{[...UserReviews.entries()].slice(0, 4).map((x, i) => (
					<li
						key={i}
						className="carousel-item rounded-box max-w-64 sm:max-w-paragraph"
					>
						<UserReview name={x[0]} message={x[1]} />
					</li>
				))}
			</ul>
			<SectionDivider />
		</section>
	);
}

/**
 * @typedef {Object} IUserReview
 * @prop {string} name
 * @prop {string} message
 */

/**
 * @component
 * @param {IUserReview} props
 * @returns {import("react").JSX.Element}
 */
function UserReview(props) {
	return (
		<article className="card bg-base-100 shadow-sm">
			<blockquote
				cite={"https://www.cortinasbisbal.com.ar"}
				className="card-body max-w-sm flex"
			>
				<QuoteIcon />
				<q className="text-md">{props.message}</q>
				<footer className="font-semibold text-end mt-auto">
					~ {props.name}
				</footer>
			</blockquote>
		</article>
	);
}

export const QuoteIcon = () => (
	<svg viewBox="0 0 24 24" className="fill-current size-10">
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path d="M9 5a2 2 0 0 1 2 2v6c0 3.13 -1.65 5.193 -4.757 5.97a1 1 0 1 1 -.486 -1.94c2.227 -.557 3.243 -1.827 3.243 -4.03v-1h-3a2 2 0 0 1 -1.995 -1.85l-.005 -.15v-3a2 2 0 0 1 2 -2z" />
		<path d="M18 5a2 2 0 0 1 2 2v6c0 3.13 -1.65 5.193 -4.757 5.97a1 1 0 1 1 -.486 -1.94c2.227 -.557 3.243 -1.827 3.243 -4.03v-1h-3a2 2 0 0 1 -1.995 -1.85l-.005 -.15v-3a2 2 0 0 1 2 -2z" />
	</svg>
);
