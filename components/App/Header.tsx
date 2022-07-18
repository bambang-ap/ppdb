import { Wrapper, Text, Button } from "@components";
import { PATHS } from "@constants";
import { storageUserData } from "@utils";
import Head from "next/head";
import { useRouter } from "next/router";

type Props = {
  title: string;
};

export const Header = (props: Props) => {
  const { title } = props;
  const { replace } = useRouter();

  const doLogout = () => {
    storageUserData.remove();
    replace(PATHS.LOGIN);
  };

  return (
    <Wrapper>
      <Head>
        <title>{title}</title>
      </Head>
      <Text>{title}</Text>
      <Button onClick={doLogout}>Logout</Button>
    </Wrapper>
  );
};
