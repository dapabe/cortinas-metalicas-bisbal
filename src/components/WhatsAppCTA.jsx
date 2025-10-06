import { SocialLinks } from "#/constants/SocialLinks";
import Image from "next/image";
import Link from "next/link";

export function WhatsAppCTA() {
	return (
		<Link
			id="wsp"
			aria-label="Link para charlar por WhatsApp"
			href={SocialLinks.WhatsApp}
			target="_blank"
			rel="noopener noreferrer"
			className="fixed bottom-2 right-2 z-10 p-3 rounded-full shadow-xl tooltip tooltip-left tooltip-success bg-[#00E676]"
			data-tip="Contactanos por WhatsApp"
		>
			<Image
				src={"/whatsapp.svg"}
				width={64}
				height={64}
				className="size-12"
				alt="Logo de WhatsApp"
			/>
		</Link>
	);
}
