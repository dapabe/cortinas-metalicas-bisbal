import { UserReviews } from "#/constants/UserReviews.data";

export function UserReviewSection() {
	return (
		<section className="w-full relative flex flex-wrap">
			{[...UserReviews.entries()].slice(0, 4).map((x, i) => (
				<UserReview key={i} name={x[0]} message={x[1]} />
			))}
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
				<q>{props.message}</q>
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
