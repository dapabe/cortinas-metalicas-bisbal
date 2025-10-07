import { HeroSection } from "#/components/pages/home/sections/Hero/Hero.section";
import { ServicePromotionSection } from "#/components/pages/home/sections/ServicePromotion/ServicePromotion.section";
import { WhatsAppCTA } from "#/components/WhatsAppCTA";
import { WorkGallerySection } from "#/components/pages/home/sections/WorkGallery/WorkGallery.section";
import { ChooseUsSection } from "#/components/pages/home/sections/ChooseUs/ChooseUs.section";
import { AccesorySection } from "#/components/pages/home/sections/Accesories/Accesory.section";
import { Footer } from "#/components/pages/home/sections/Footer";
import { SendReviewSection } from "#/components/pages/home/sections/SendReview.section";
import { SelfAdvertise } from "#/components/other/SelfAdvertise";
import { UserReviewSection } from "#/components/pages/home/sections/UserReviews/UserReview.section";
import { FloatingNavbar } from "#/components/pages/home/FloatingNavbar";
import { SocialSection } from "#/components/pages/home/sections/Socials/Social.section";

export default function Home() {
	return (
		<div className="min-h-screen font-[family-name:var(--font-geist-sans)] flex flex-col relative bg-base-100 gap-y-4">
			<main className="flex-1 space-y-4 flex flex-col">
				<SelfAdvertise />
				<HeroSection />
				<FloatingNavbar />
				<ChooseUsSection />
				<WorkGallerySection />
				<UserReviewSection />
				<SocialSection/>
				<ServicePromotionSection />
				<AccesorySection />
				<SendReviewSection />
				<WhatsAppCTA />
			</main>
			<Footer />
		</div>
	);
}
