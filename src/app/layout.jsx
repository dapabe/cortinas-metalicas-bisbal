import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "#/components/Toaster";
import Head from "next/head";
import Script from "next/script";

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
	metadataBase: new URL("https://www.cortinasbisbal.com.ar"),
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
	keywords: [
		"Cortinas metálicas",
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
	const googleAnalytics = () => {
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag("js", new Date());
		gtag("config", "G-9548H3F814");
	};

	return (
		<html lang="es-AR" data-theme="bumblebee" className="scroll-smooth">
			<Head key={"GoogleAnalytics"}>
				{/* <!-- Google tag (gtag.js) --> */}
				<Script
					async
					src="https://www.googletagmanager.com/gtag/js?id=G-9548H3F814"
				></Script>
				<Script>{googleAnalytics()}</Script>
			</Head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-base-100`}
			>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
