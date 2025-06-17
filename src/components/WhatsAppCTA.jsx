import Image from "next/image";

export function WhatsAppCTA() {
	return (
		<a
			href="https://wa.me/5491126942624?text=Hola%20Cortinas%20Metálicas%20Bisbal,%20me%20gustaría%20consultar"
			target="_blank"
			rel="noopener noreferrer"
			className="fixed bottom-4 right-4 z-10 p-1 rounded-full shadow-xl tooltip tooltip-left"
			data-tip="Contactanos por WhatsApp"
		>
			<Image
				src={"/whatsapp.svg"}
				width={64}
				height={64}
				alt="Contacto de WhatsApp"
			/>
		</a>
	);
}
