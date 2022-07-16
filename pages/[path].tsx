import Login from "@pages/Login";
import Register from "@pages/Register";
import { useRouter } from "next/router";

const Index = () => {
  const { query } = useRouter();
  return query.path === "login" ? (
    <Login />
  ) : query.path === "register" ? (
    <Register />
  ) : 'null';
};

export default Index;
