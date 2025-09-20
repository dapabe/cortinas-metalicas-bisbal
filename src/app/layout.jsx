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
	title: "Cortinas Metalicas Bisbal",
	description:
		"Instalación, Reparación y Motorizacion de Cortinas Metalicas, y Persianas por CABA y Provincia.",
	twitter: {
		card: "summary_large_image",
		title: "Cortinas Metalicas Bisbal",
		description:
			"Instalación, Reparación y Motorizacion de Cortinas Metalicas, y Persianas por CABA y Provincia.",
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
		title: "Cortinas Metalicas Bisbal",
		description:
			"Instalación, Reparación, Motorizacion de Cortinas Metalicas y Persianas por CABA y Provincia.",
		url: PROD_WEBSITE,
		siteName: "Cortinas Metalicas Bisbal",
		type: "website",
		images: {
			url: PROD_WEBSITE.toString() + "work/cortina6.jpg",
			width: 1440,
			height: 1800,
			alt: "Cortinas Metalicas Bisbal - Instalación, Reparación y Motorizacion de Cortinas Metalicas, y Persianas por CABA y Provincia.",
		},
	},
	keywords: [
		"Cortinas metalicas",
		"Cortinas enrollables",
		"Cortinas metalicas en CABA y provincia",
		"Cortinas enrollables en CABA y provincia",
		"Persianas enrollables",
		"Reparación de cortinas metalicas",
		"Motorización de cortinas metalicas",
		"Instalación de cortinas metalicas",
		"Instalación de persianas enrollables",
		"Reparación de persianas enrollables",
		"Ventas las 24 horas",
		"Instalaciones las 24 horas",
		"Servicio de cortinas metalicas",
		"Servicio de persianas enrollables",
		"Servicio técnico de cortinas metalicas",
		"Servicio técnico de persianas enrollables",
		"Reparación de cortinas metalicas en CABA",
		"Mantenimiento de cortinas metalicas",
	],
};

export default function RootLayout({ children }) {
	return (
		<html lang="es-AR" data-theme="bumblebee" className="scroll-smooth">
			<GoogleAnalytics />
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1.0, viewport-fit=cover"
			></meta>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-base-100`}
			>
				{children}
				<Toaster />
				<VercelAnalytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
