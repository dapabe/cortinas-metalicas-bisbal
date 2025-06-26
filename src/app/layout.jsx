import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "#/components/Toaster";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

/** @type {import("next").Metadata} */
export const metadata = {
	authors: {
		name: "Daniel Patricio Becerra",
		url: "https://github.com/dapabe",
	},
	title: "Cortinas Metálicas Bisbal",
	description:
		"Instalación, Reparación y Motorizacion de Cortinas Metálicas, y Persianas por CABA, Matadero y alrededores.",
	twitter: {
		card: "summary_large_image",
		title: "Cortinas Metálicas Bisbal",
		description:
			"Instalación, Reparación y Motorizacion de Cortinas Metálicas, y Persianas por CABA, Matadero y alrededores.",
		creator: "_danzen",
	},
	metadataBase: new URL("http://www.cortinasmetalicasbisbal.com.ar"),
	alternates: {
		canonical: "/",
		languages: {
			"es-AR": "/",
			"es-ES": "/",
			es: "/",
		},
	},
	openGraph: {
		countryName: "Argentina",
		locale: "es_AR",
		title: "Cortinas Metálicas Bisbal",
		description:
			"Instalación, Reparación y Motorizacion de Cortinas Metálicas, y Persianas por CABA, Matadero y alrededores.",
		url: "http://www.cortinasmetalicasbisbal.com.ar",
		siteName: "Cortinas Metálicas Bisbal",
		type: "website",
		images: {
			url: "/work/cortina6.jpg",
			width: 1440,
			height: 1800,
			alt: "Cortinas Metálicas Bisbal - Instalación, Reparación y Motorizacion de Cortinas Metálicas, y Persianas por CABA, Matadero y alrededores.",
		},
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="es-AR" data-theme="bumblebee" className="scroll-smooth">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-base-100`}
			>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
