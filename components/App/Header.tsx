import Head from "next/head";
import { Wrapper, Text, Button, BoxSpace } from "@components";
import { PATHS } from "@constants";
import { storageUserData } from "@utils";
import { useRouter } from "next/router";

type Props = {
  title: string;
};

export const Header = (props: Props) => {
  const { title } = props;
  const { replace, push } = useRouter();

  const doLogout = () => {
    storageUserData.remove();
    replace(PATHS.LOGIN);
  };

  return (
    <>
      <Wrapper itemsCenter>
        <Head>
          <title>{title}</title>
        </Head>
        <Button onClick={() => push(PATHS.APP)}>Home</Button>
        <BoxSpace b />
        <Text flex>{title}</Text>
        <Button onClick={() => push(PATHS.SETTINGS)}>Akun</Button>
        <BoxSpace b />
        <Button onClick={doLogout}>Logout</Button>
      </Wrapper>
      <BoxSpace b />
    </>
  );
};
