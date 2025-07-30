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

			{/* <!-- Event snippet for Vista de página conversion page --> */}
			<Script id="google-conversion" strategy="afterInteractive">
				{`gtag('event', 'conversion', {
      			'send_to': 'AW-17275363072/nKINCN-Fw-QaEIC-xK1A',
      			'value': 1.0,
      			'currency': 'ARS'
  				});`}
			</Script>
		</>
	);
}
