import "../styles/globals.css";
import "../styles/fonts.css";
import { useRouter } from "next/router";

import AuthValue from "../contexts/authProvider";
import ModalProvider from "../contexts/modalProvider";
import SquadProvider from "../contexts/squadProvider";
import { SocketProvider } from "../contexts/socketProvider";

import useAuth from "../lib/useAuth";
import { useEffect } from "react";

import Head from "next/head";
import Layout from "../components/Layouts/appLayout";
import Image from "next/image";
import Script from "next/script";
import { useState } from "react";

function Squadz({ Component, pageProps }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const pagesThatCanBeViewedUnAuth = ["/home", "/discover"];
    if (isLoading) {
      return;
    }
    if (isAuthenticated) {
      //Do something
    } else {
      if (!pagesThatCanBeViewedUnAuth.includes(router.pathname)) {
        router.push("/home");
      }
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [isLoading, isAuthenticated]);
  return (
    <>
      <Head>
        <title>Squadz</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="UTF-8"></meta>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="theme-color" content="#fb00ff" />
        <meta
          name="description"
          content="Your NFT Community Portal. Build, engage, reward! Build an engaged community by rewarding micro-actions all in one platform. "
        />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Squadz" />
        <meta
          property="og:description"
          content="Your NFT Community Portal. Build, engage, reward! Build an engaged community by rewarding micro-actions all in one platform."
        />
        <meta
          property="og:image"
          content="https://www.squadz.in/assets/images/logo.png"
        />
        <meta property="og:url" content="https://www.squadz.in/" />

        <meta name="twitter:title" content="Squadz" />
        <meta
          name="twitter:description"
          content="Your NFT Community Portal. Build, engage, reward! Build an engaged community by rewarding micro-actions all in one platform."
        />
        <meta name="twitter:url" content="https://www.squadz.in/" />
        <meta
          name="twitter:card"
          content="Your NFT Community Portal. Build, engage, reward! Build an engaged community by rewarding micro-actions all in one platform."
        />

        <meta name="robots" content="index, archive" />
        <meta
          name="keywords"
          content="decentralized, deso, squad, community, engage, nft, deso-protocol, chat, nft community portal"
        />
        <link rel="canonical" href="https://squadz.in/" />
        <meta name="apple-mobile-web-app-status-bar" content="#ff007a" />
        <meta name="mobile-web-app-capable" content="yes" />

        <link
          rel="preload"
          href="/assets/fonts/BebasNeue/bebas-neue-v9-latin-regular.woff"
          as="font"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/assets/fonts/BebasNeue/bebas-neue-v9-latin-regular.woff2"
          as="font"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/assets/fonts/AtkinsonHyperlegible/atkinson-hyperlegible-v10-latin-regular.woff"
          as="font"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/assets/fonts/AtkinsonHyperlegible/atkinson-hyperlegible-v10-latin-regular.woff2"
          as="font"
          crossOrigin="anonymous"
        />
        <link rel="shortcut icon" href="/assets/icons/favicon.ico" />
      </Head>

      {loading && (
        <div className="loading">
          <Image
            src="/assets/images/logo.png"
            alt="Loading"
            width={308}
            height={71}
            priority
          ></Image>
        </div>
      )}

      <AuthValue>
        <ModalProvider>
          <SquadProvider>
            <SocketProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </SocketProvider>
          </SquadProvider>
        </ModalProvider>
      </AuthValue>
    </>
  );
}

export default Squadz;
