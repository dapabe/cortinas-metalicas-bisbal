import Image from "next/image";
import Link from "next/link";

export function WhatsAppCTA() {
	return (
		<Link
			id="wsp"
			href="https://wa.me/5491126942624?text=Hola%20Cortinas%20Metálicas%20Bisbal,%20me%20gustaría%20consultar"
			target="_blank"
			rel="noopener noreferrer"
			className="fixed bottom-1.5 right-1.5 z-10 p-3 rounded-full shadow-xl tooltip tooltip-left bg-[#00E676]"
			data-tip="Contactanos por WhatsApp"
		>
			<Image
				src={"/whatsapp.svg"}
				width={64}
				height={64}
				className="size-12"
				alt="Contacto de WhatsApp"
			/>
		</Link>
	);
}
