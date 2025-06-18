import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
	title: "Cortinas Metálicas Bisbal",
	description: "Instalaciçón de cortinas metálicas por CABA",
};

export default function RootLayout({ children }) {
	return (
		<html lang="es-AR" data-theme="bumblebee" className="scroll-smooth">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-base-100`}
			>
				{children}
			</body>
		</html>
	);
}
