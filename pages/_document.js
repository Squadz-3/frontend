import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <Script
          strategy="afterInteractive"
          id="Google tag"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YFMKYBDJBC', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
        <Script
          strategy="beforeInteractive"
          src="https://accounts.google.com/gsi/client"
          async
          defer
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
