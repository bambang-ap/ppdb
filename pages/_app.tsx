import React from "react";

import { AppProps } from "next/app";

import Head from "next/head";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title></title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
