import React, { useEffect } from "react";
import { AppProps } from "next/app";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { storageUserData } from "@utils";
import { atomUserData } from "@recoil/atoms";
import { User } from "@type/User";

import "./globals.css";

export default ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <RenderComponent>
        <Component {...pageProps} />
      </RenderComponent>
    </RecoilRoot>
  );
};

const RenderComponent = ({ children }: { children: JSX.Element }) => {
  const setUserData = useSetRecoilState(atomUserData);

  useEffect(() => {
    const user = storageUserData.get() ?? ({} as User);
    setUserData(user);
  }, []);

  return children;
};
