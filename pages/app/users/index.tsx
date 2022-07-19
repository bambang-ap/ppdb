import { Header } from "@appComponent";
import {
  BoxSpace,
  Button,
  Container,
  FormInput,
  Text,
  Wrapper,
} from "@components";
import { atomListUsers } from "@recoil/atoms";
import { User } from "@type/User";
import { ApiClient } from "@utils";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default () => {
  const [users, setUsers] = useRecoilState(atomListUsers);
  const [add, setAdd] = useState(false);

  const getData = () => {
    ApiClient.listUserData().then(({ data }) => setUsers(data));
  };

  const onCreate = async (user: User) => {
    try {
      await ApiClient.insertUserData(user);
      getData();
      alert("Berhasil tambah user admin");
      setAdd(false);
    } catch (err) {
      // @ts-ignore
      alert(err?.response?.data?.msg);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <Header title="Daftar User" />
      {add && <FormUser onCreate={onCreate} />}
      <Button onClick={() => setAdd(!add)}>{add ? "Batal" : "Tambah"}</Button>
      <BoxSpace b />
      <Wrapper>
        <Text flex>Nama</Text>
        <Text flex>Username</Text>
        <Text flex>Role</Text>
      </Wrapper>
      {users?.map((user) => {
        const { name, role, username } = user;
        return (
          <Wrapper>
            <Text flex>{name}</Text>
            <Text flex>{username}</Text>
            <Text flex>{role}</Text>
          </Wrapper>
        );
      })}
    </Container>
  );
};

const FormUser = ({ onCreate }: { onCreate: (user: User) => void }) => {
  const [user, _setUser] = useState({} as User);
  const [pass2, setPass2] = useState("");

  const { name, password, username } = user;

  const setUser = (newVal: Partial<User>) => {
    _setUser({ ...user, ...newVal });
  };

  const onSave = () => {
    if (password !== pass2) return alert("Password tidak sama");

    onCreate(user);
  };

  return (
    <>
      <FormInput
        title="Nama"
        value={name}
        onChangeText={(name) => setUser({ name })}
      />
      <FormInput
        title="Username"
        value={username}
        onChangeText={(username) => setUser({ username })}
      />
      <FormInput
        title="Password"
        value={password}
        type="password"
        onChangeText={(password) => setUser({ password })}
      />
      <FormInput
        value={pass2}
        type="password"
        onChangeText={setPass2}
        title="Konfirmasi Password"
      />
      <Button onClick={() => onSave()}>Tambah</Button>
    </>
  );
};
