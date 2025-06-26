"use client";
import { useToastStore } from "#/stores/toaster.store";
import {
	CheckIcon,
	ExclamationCircleIcon,
	ExclamationTriangleIcon,
	InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { cloneElement, useEffect, useMemo, useRef, useState } from "react";
import { twJoin } from "tailwind-merge";

/**
 * @component
 * @return {JSX.Element}
 */
export function Toaster() {
	// const curToasts = useRef(null);
	const { toasts } = useToastStore();

	// useEffect(() => {
	// 	useToastStore.subscribe((state) => (state.toasts = curToasts.current));
	// }, []);

	// if (!toasts.length) return null;

	return (
		<ul
			className="container mx-auto p-2 fixed z-50 inset-x-0 top-0 sm:bottom-0 sm:top-auto flex flex-col gap-y-2 items-center"
			// autoFocus Commented because of accesibility reasons
		>
			{toasts.map((t) => (
				<ToastMessage key={t.id} {...t} />
			))}
		</ul>
	);
}

/**
 * @component
 * @param {IToast} props
 * @returns {JSX.Element}
 */
function ToastMessage({ id, content, status }) {
	// const { removeToast } = useToastStore();
	const [isExiting, setExiting] = useState(false);
	const [progress, setProgress] = useState(100);
	const animRef = useRef(null);
	const duration = 4000;
	const fadeOutDuration = 300;

	// const handleClose = () => {
	// 	setExiting(true);
	// 	setTimeout(() => removeToast(id), fadeOutDuration);
	// };

	useEffect(() => {
		const startTime = Date.now();
		const totalDuration = duration;

		const updateProgress = () => {
			const elapsed = Date.now() - startTime;
			const remaining = totalDuration - elapsed;

			const newProgress = Math.max(0, (remaining / totalDuration) * 100);
			setProgress(newProgress);

			if (remaining <= fadeOutDuration && !isExiting) {
				setExiting(true);
			}

			if (remaining > 0) {
				animRef.current = requestAnimationFrame(updateProgress);
			}
		};

		animRef.current = requestAnimationFrame(updateProgress);

		return () => {
			if (animRef.current) {
				cancelAnimationFrame(animRef.current);
			}
		};
	}, [duration, fadeOutDuration, isExiting]);

	const icon = useMemo(() => {
		switch (status) {
			case "error":
				return <ExclamationCircleIcon />;
			case "success":
				return <CheckIcon />;
			case "warning":
				return <ExclamationTriangleIcon />;
			default:
				return <InformationCircleIcon />;
		}
	}, [status]);

	const color = useMemo(() => {
		switch (status) {
			case "error":
				return "alert-error";
			case "success":
				return "alert-success";
			case "warning":
				return "alert-warning";
			default:
				return "alert-info";
		}
	}, [status]);

	return (
		<li
			role="alert"
			className={twJoin("alert transition-opacity w-max", color)}
			style={{
				opacity: progress,
			}}
		>
			{cloneElement(icon, { className: "size-6" })}
			{content}
		</li>
	);
}
