import { Hero } from "#/components/Hero";
import { ImageCarousel } from "#/components/ImageCarousel";
import { Navbar } from "#/components/Navbar";
import { WhatsAppCTA } from "#/components/WhatsAppCTA";
import { WorkGallery } from "#/components/WorkGallery";

export default function Home() {
	return (
		<div className="min-h-screen font-[family-name:var(--font-geist-sans)] flex flex-col relative">
			{/* <Navbar /> */}
			<main className="flex-1 space-y-8">
				<Hero />
				<WorkGallery />
				<ImageCarousel />
			</main>
			<WhatsAppCTA />
			<footer className="flex gap-6 flex-wrap items-center justify-center h-24">
				<span>Copyright 2025</span>
			</footer>
		</div>
	);
}
