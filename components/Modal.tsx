import { View } from '@components';
import { COLORS } from '@constants';

export type ModalProps = {
  visible: boolean;
  children: JSX.Element;
};

export const Modal = (props: ModalProps) => {
  const { children, visible, ...rest } = props;

  if (!visible) return null;

  return (
    <View
      justifyCenter
      absolute
      zIndex={1}
      width="100vw"
      height="100vh"
      style={{ backgroundColor: COLORS.BLACK_T5 }}
      {...rest}
    >
      {children}
    </View>
  );
};
