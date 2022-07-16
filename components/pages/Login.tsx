import { Container, View, Input, Button } from "@components";

const Login = () => {
  return (
    <Container>
      <View>
        <Input placeholder="ex: myusername"/>
        <Input placeholder="ex: ··········"/>
        <Button>Login</Button>
      </View>
    </Container>
  );
};

export default Login;
