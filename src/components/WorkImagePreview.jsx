"use client";
import "#def";
import Image from "next/image";
import { MagnifyingGlassPlusIcon } from "@heroicons/react/24/solid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { useImagePreview } from "#/hooks/useImagePreview";

/**
 * @component
 * @param {ICompletedWork} props
 * @returns {JSX.Element}
 */
export function WorkImagePreview({ path }) {
	const { setCurrentImagePath } = useImagePreview();

	return (
		// <div className="size-48 bg-base-300 relative shadow-xl">
		<button
			className="btn btn-ghost size-48 bg-base-300 relative shadow-xl p-1"
			onClick={() => setCurrentImagePath(path)}
		>
			<div className="relative size-full">
				<Image
					src={path}
					alt="Gallery Image 1"
					quality={100}
					fill
					placeholder="blur"
					blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR42mP8//8/AwAI/wH+9Q4AAAAASUVORK5CYII="
					className="object-cover rounded-md"
				/>
			</div>
			{/* Para escritorio */}
			<div className="hidden md:flex absolute inset-0 group hover:bg-black/50 transition-colors rounded-md items-center justify-center">
				<MagnifyingGlassPlusIcon className="opacity-0 group-hover:opacity-100 size-24 text-base-100" />
			</div>
			{/* Para celulares */}
			<div className="md:hidden absolute bottom-0 right-0 bg-base-100 p-2 rounded-tl-md rounded-br-md opacity-80">
				<MagnifyingGlassPlusIcon className="size-12 text-base-content" />
			</div>
		</button>
		// </div>
	);
}
