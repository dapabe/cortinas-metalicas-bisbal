import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { Toaster } from "#/components/Toaster";
import { GoogleAnalytics } from "#/components/google/GoogleAnalytics";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const PROD_WEBSITE = new URL("https://www.cortinasbisbal.com.ar");

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
	metadataBase: PROD_WEBSITE,
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
			"Instalación, Reparación, Motorizacion de Cortinas Metálicas y Persianas por CABA, Matadero y alrededores.",
		url: PROD_WEBSITE,
		siteName: "Cortinas Metálicas Bisbal",
		type: "website",
		images: {
			url: PROD_WEBSITE.toString() + "work/cortina6.jpg",
			width: 1440,
			height: 1800,
			alt: "Cortinas Metálicas Bisbal - Instalación, Reparación y Motorizacion de Cortinas Metálicas, y Persianas por CABA, Matadero y alrededores.",
		},
	},
	keywords: [
		"Cortinas metálicas",
		"Cortinas enrollables",
		"Cortinas metálicas en CABA",
		"Cortinas enrollables en CABA",
		"Persianas enrollables",
		"Reparación de cortinas metálicas",
		"Motorización de cortinas metálicas",
		"Instalación de cortinas metálicas",
		"Instalación de persianas enrollables",
		"Reparación de persianas enrollables",
		"Ventas las 24 horas",
		"Servicio de cortinas metálicas",
		"Servicio de persianas enrollables",
		"Servicio técnico de cortinas metálicas",
		"Servicio técnico de persianas enrollables",
		"Reparación de cortinas metálicas en CABA",
	],
};

export default function RootLayout({ children }) {
	return (
		<html lang="es-AR" data-theme="bumblebee" className="scroll-smooth">
			<GoogleAnalytics />
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-base-100`}
			>
				{children}
				<Toaster />
				<VercelAnalytics />
				<SpeedInsights debug />
			</body>
		</html>
	);
}
