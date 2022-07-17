import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

import "@utils/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>PPDB (Penerimaan Peserta Didik Baru)</title>
      </Head>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
};

export default MyApp;
