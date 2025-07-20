import Head from "next/head";
import Script from "next/script";

export function GoogleAnalytics() {
	return (
		<>
			{/* <!-- Google tag (gtag.js) --> */}
			<Script
				async
				strategy="afterInteractive"
				src="https://www.googletagmanager.com/gtag/js?id=G-9548H3F814"
			></Script>
			<Script id="google-analytics" strategy="afterInteractive">{`
       window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-9548H3F814');
      `}</Script>
		</>
	);
}
