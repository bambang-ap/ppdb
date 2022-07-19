import { Header } from "@appComponent";
import { BoxSpace, Button, Container, FormInput, Wrapper } from "@components";
import { atomUserData } from "@recoil/atoms";
import { User, USER_ROLES } from "@type/User";
import { ApiClient } from "@utils";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

export default () => {
  const [userData, setUserData] = useRecoilState(atomUserData);
  const [user, _setUser] = useState(userData);
  const [showPassword, setShowPassword] = useState(false);
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");

  const { name, role, username, _id, image } = user;

  const setUser = (newVal: Partial<User>) => _setUser({ ...user, ...newVal });

  const changeUserData = async () => {
    let userData = { name, role, username, _id: "1", image } as User;

    if (showPassword) {
      if (pass1 !== pass2) return alert("Password tidak sama");
      userData.password = pass1;
    }

    const { data } = await ApiClient.updateUserData(userData);
    setPass1("");
    setPass2("");
    setShowPassword(false);
    setUserData(data);
  };

  useEffect(() => {
    _setUser(userData);
  }, [userData]);

  return (
    <Container>
      <Header title="Setting" />
      <FormInput
        title="Username"
        value={username}
        onChangeText={(username) => setUser({ username })}
      />
      <FormInput
        title="Nama Lengkap"
        value={name}
        onChangeText={(name) => setUser({ name })}
      />
      <FormInput
        disabled
        title="Role"
        value={role}
        onChangeText={(role) => setUser({ role: role as USER_ROLES })}
      />
      {showPassword && (
        <>
          <FormInput
            title="Password"
            value={pass1}
            type="password"
            onChangeText={setPass1}
          />
          <FormInput
            title="Konfirmasi Password"
            value={pass2}
            type="password"
            onChangeText={setPass2}
          />
        </>
      )}
      <Wrapper>
        <Button flex onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "Batal" : "Ubah password"}
        </Button>
        <BoxSpace b />
        <Button flex onClick={changeUserData}>
          Ubah
        </Button>
      </Wrapper>
    </Container>
  );
};
