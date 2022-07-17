import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>PPDB (Penerimaan Peserta Didik Baru)</title>
        <link rel="stylesheet" href="globals.css"></link>
      </Head>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
};

export default MyApp;
