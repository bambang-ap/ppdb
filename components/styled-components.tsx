import styled from "styled-components";

import { FlexAll, FlexBox, getFlexBox } from "@type/flexBox.type";
import { COLORS, SIZES, TEXT_SIZES } from "@constants";

export const View = styled.div<FlexBox>((props) => {
  const { flexBoxStyleProps } = getFlexBox(props);
  const { textAlign, ...rest } = flexBoxStyleProps ?? {};
  const { onClick } = props;
  return {
    ...rest,
    display: "flex",
    flexDirection: "column",
    cursor: onClick ? "pointer" : undefined,
  };
});

export const Container = styled(View)({
  flex: 1,
  padding: 14,
});

export const Wrapper = styled(View)({
  flexDirection: "row",
  justifyContent: "space-between",
});

export const Text = styled.div<FlexAll>((props) => {
  const { flexBoxStyleProps } = getFlexBox(props);
  const { onClick } = props;
  return {
    fontSize: TEXT_SIZES.t_body_3,
    display: "flex",
    cursor: onClick ? "pointer" : undefined,
    ...flexBoxStyleProps,
  };
});

export const Button = styled.div<FlexAll>((props) => {
  const { flexBoxStyleProps } = getFlexBox(props);
  return {
    ...flexBoxStyleProps,
    alignContent: "center",
    fontSize: TEXT_SIZES.t_body_1,
    display: "flex",
    cursor: "pointer",
    borderRadius: SIZES._radius,
    backgroundColor: COLORS.PINK,
    color: COLORS.WHITE,
    textAlign: "center",
    padding: SIZES.padding,
  };
});

const StyledInput = styled.input<{
  onChangeText?: (value: string) => void;
  onSubmitEditting?: () => void;
}>((props) => {
  const { flexBoxStyleProps } = getFlexBox(props);
  const { textAlign, ...rest } = flexBoxStyleProps ?? {};
  return {
    ...rest,
    height: SIZES.box,
    borderRadius: SIZES._radius,
    borderWidth: SIZES._outline,
    fontSize: TEXT_SIZES.t_body_3,
    padding: `0 ${SIZES.padding}`,
    display: "flex",
    flexDirection: "column",
  };
});

export const Input = (props: typeof StyledInput["defaultProps"]) => {
  const { onChangeText, onChange, onKeyUp, onSubmitEditting, ...rest } =
    props ?? {};

  return (
    <StyledInput
      onChange={(event) => {
        onChangeText?.(event.target.value);
        onChange?.(event);
      }}
      onKeyUp={(event) => {
        if (event.key === "Enter") onSubmitEditting?.();
        onKeyUp?.(event);
      }}
      {...rest}
    />
  );
};

const StyledTextArea = styled.textarea<{
  onChangeText?: (value: string) => void;
  onSubmitEditting?: () => void;
}>((props) => {
  // @ts-ignore
  const { flexBoxStyleProps } = getFlexBox(props);
  const { textAlign, ...rest } = flexBoxStyleProps ?? {};
  return {
    ...rest,
    height: SIZES.box,
    borderRadius: SIZES._radius,
    borderWidth: SIZES._outline,
    fontSize: TEXT_SIZES.t_body_3,
    padding: `0 ${SIZES.padding}`,
    display: "flex",
    flexDirection: "column",
  };
});

export const TextArea = (props: typeof StyledTextArea["defaultProps"]) => {
  const { onChangeText, onChange, onKeyUp, onSubmitEditting, ...rest } =
    props ?? {};

  return (
    <StyledTextArea
      onChange={(event) => {
        onChangeText?.(event.target.value);
        onChange?.(event);
      }}
      onKeyUp={(event) => {
        if (event.key === "Enter") onSubmitEditting?.();
        onKeyUp?.(event);
      }}
      {...rest}
    />
  );
};

type BoxSpaceProps = Partial<
  ObjFromTuple<"A" | "B" | "C" | "D" | "E" | "F" | "G">
>;

export const BoxSpace = (props: BoxSpaceProps) => {
  const { b, c, d, e, f, g } = props;

  const size = b
    ? SIZES.content
    : c
    ? SIZES.contentlarge
    : d
    ? SIZES.container
    : e
    ? SIZES.box
    : f
    ? SIZES.header
    : g
    ? SIZES.pinspacing
    : SIZES.padding;

  return <View width={size} height={size} />;
};
