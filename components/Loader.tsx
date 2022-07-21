import { View, Text } from "@components";
import { COLORS } from "@constants";
import { atomLoader } from "@recoil/atoms";
import { useRecoilValue } from "recoil";

export const Loader = () => {
  const visible = useRecoilValue(atomLoader);

  if (!visible) return null;

  return (
    <View
      itemsCenter
      justifyCenter
      absolute
      zIndex={1}
      width="100vw"
      height="100vh"
      style={{ backgroundColor: COLORS.BLACK_T5, margin: 0 }}
    >
      <Text style={{ color: COLORS.WHITE }}>Harap tunggu...</Text>
    </View>
  );
};
