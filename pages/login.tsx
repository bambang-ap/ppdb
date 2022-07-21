import { Container, View, Input, Button, BoxSpace, Text } from "@components";
import { PATHS } from "@constants";
import { useLoader } from "@hooks";
import { atomUserData } from "@recoil/atoms";
import { ApiClient, storageUserData } from "@utils";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSetRecoilState } from "recoil";

export default () => {
  const { replace } = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const setUserData = useSetRecoilState(atomUserData);
  const loader = useLoader();

  const doLogin = async () => {
    loader.show();
    try {
      const { data } = await ApiClient.login(username, password);
      storageUserData.set(data);
      setUserData(data);
      replace(PATHS.APP);
    } catch (err) {
      // @ts-ignore
      alert(err?.response?.data?.msg);
    }
    loader.hide();
  };

  return (
    <Container flex justifyCenter>
      <View>
        <Text>Login</Text>
        <BoxSpace b />
        <Input
          value={username}
          onChangeText={setUsername}
          placeholder="ex: myusername"
        />
        <BoxSpace b />
        <Input
          value={password}
          type="password"
          onChangeText={setPassword}
          placeholder="ex: ··········"
        />
        <BoxSpace b />
        <Button onClick={doLogin}>Login</Button>
      </View>
    </Container>
  );
};
