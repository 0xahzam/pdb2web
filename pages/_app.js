import "../styles/globals.css";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>pdb2web🧬</title>
        <meta
          name="viewport"
          key="main"
          content="width=device-width, initial-scale=1.0"
        />

        <meta name="title" content="pdb2web🧬" />
        <meta name="description" content="visualizing proteins in one click" />

        <meta property="og:type" content="website" key="og-type" />
        <meta
          property="og:url"
          content="https://pdb2web.vercel.app/"
          key="og-url"
        />
        <meta property="og:title" content="pdb2web🧬" key="og-title" />
        <meta
          property="og:description"
          content="visualizing proteins in one click"
          key="og-desc"
        />
        <meta
          property="og:image"
          content="https://i.ibb.co/6NzZTgm/pdb2web.png"
          key="og-image"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://pdb2web.vercel.app/"
          key="twt-url"
        />
        <meta property="twitter:title" content="pdb2web🧬" key="twt-title" />
        <meta
          property="twitter:description"
          content="visualizing proteins in one click"
          key="twt-desc"
        />
        <meta
          property="twitter:image"
          content="https://i.ibb.co/6NzZTgm/pdb2web.png"
          key="twt-img"
        />
      </Head>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
