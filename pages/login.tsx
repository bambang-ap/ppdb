import { Container, View, Input, Button } from "@components";
import { PATHS } from "@constants";
import { storageUserData } from "@utils";
import { useRouter } from "next/router";
import { useState } from "react";

const Login = () => {
  const { push } = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const doLogin = async () => {
    const { loginApi } = await import("@utils/api");
    const resp = await loginApi(username, password);

    if (!resp) return;

    storageUserData.set(resp);
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

export default Login;
