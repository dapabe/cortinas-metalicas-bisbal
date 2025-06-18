import { HeroSection } from "#/components/sections/Hero.section";
import { ImageCarousel } from "#/components/ImageCarousel";
import { Navbar } from "#/components/Navbar";
import { PromotionSection } from "#/components/sections/Promotion.section";
import { WhatsAppCTA } from "#/components/WhatsAppCTA";
import { WorkGallerySection } from "#/components/sections/WorkGallery.section";
import { Footer } from "#/components/sections/Footer";

export default function Home() {
	return (
		<div className="min-h-screen font-[family-name:var(--font-geist-sans)] flex flex-col relative bg-base-100 gap-y-4">
			{/* <Navbar /> */}
			<main className="flex-1 space-y-12 flex flex-col">
				<HeroSection />
				<WorkGallerySection />
				{/* <PromotionSection /> */}
				{/* <ImageCarousel /> */}
				<WhatsAppCTA />
			</main>
			<Footer />
		</div>
	);
}
