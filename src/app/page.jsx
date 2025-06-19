"use client";
import { HeroSection } from "#/components/sections/Hero.section";
import { PromotionSection } from "#/components/sections/Promotion.section";
import { WhatsAppCTA } from "#/components/WhatsAppCTA";
import { WorkGallerySection } from "#/components/sections/WorkGallery.section";
import { Footer } from "#/components/sections/Footer";
import { WorkZoneSection } from "#/components/sections/WorkZone.section";
import { PhotoProvider } from "react-photo-view";

export default function Home() {
	return (
		<div className="min-h-screen font-[family-name:var(--font-geist-sans)] flex flex-col relative bg-base-100 gap-y-4">
			{/* <Navbar /> */}
			<main className="flex-1 space-y-4 flex flex-col">
				<HeroSection />
				<WorkZoneSection />
				<WorkGallerySection />
				{/* <PromotionSection /> */}
				<WhatsAppCTA />
			</main>
			<Footer />
		</div>
	);
}
