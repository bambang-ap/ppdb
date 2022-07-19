import React, { FC, useEffect } from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { storageUserData } from "@utils";
import { atomUserData } from "@recoil/atoms";
import { User } from "@type/User";

import "./globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <RenderComponent>
        <Component {...pageProps} />
      </RenderComponent>
    </RecoilRoot>
  );
};

export default MyApp;

const RenderComponent = ({ children }: { children: JSX.Element }) => {
  const setUserData = useSetRecoilState(atomUserData);

  useEffect(() => {
    const user = storageUserData.get() ?? ({} as User);
    setUserData(user);
  }, []);

  return children;
};
