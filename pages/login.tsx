import { Container, View, Input, Button } from "@components";
import { PATHS } from "@constants";
import { atomUserData } from "@recoil/atoms";
import { ApiClient, storageUserData } from "@utils";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSetRecoilState } from "recoil";

export default () => {
  const { push, replace } = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const setUserData = useSetRecoilState(atomUserData);

  const doLogin = async () => {
    const { data, status } = await ApiClient.login(username, password);

    if (status !== 200) return;

    storageUserData.set(data);
    setUserData(data);
    replace(PATHS.APP);
  };

  return (
    <Container>
      <View>
        <Input
          value={username}
          onChangeText={setUsername}
          placeholder="ex: myusername"
        />
        <Input
          value={password}
          type="password"
          onChangeText={setPassword}
          placeholder="ex: ··········"
        />
        <Button onClick={doLogin}>Login</Button>
        <Button onClick={() => push(`${PATHS.REGISTER}?token=12345678`)}>
          Register
        </Button>
      </View>
    </Container>
  );
};
