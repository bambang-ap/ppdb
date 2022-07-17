export * from "./styled-components";
export * from "./Modal";

import {
  Input,
  InputDate,
  Text,
  Textarea,
  TextareaProps,
  InputProps,
  BoxSpace,
  Wrapper,
  View,
} from "@components";
import { COLORS, SIZES } from "@constants";

export const FormInput = (props: InputProps) => {
  const { title, ...rest } = props ?? {};
  return (
    <>
      <Text>{title}</Text>
      <BoxSpace />
      <Input {...rest} />
      <BoxSpace b />
    </>
  );
};

export const FormTextarea = (props: TextareaProps) => {
  const { title, ...rest } = props ?? {};
  return (
    <>
      <Text>{title}</Text>
      <BoxSpace />
      <BoxSpace b />
      <Textarea {...rest} />
      <BoxSpace />
      <BoxSpace b />
    </>
  );
};

export const FormInputDate = (props: InputProps) => {
  const { title, ...rest } = props ?? {};
  return (
    <>
      <Text>{title}</Text>
      <BoxSpace />
      <BoxSpace b />
      <InputDate {...rest} />
      <BoxSpace />
      <BoxSpace b />
    </>
  );
};

type FormRadioProps<T extends { name: string; value: any }> = {
  title: string;
  data: T[];
  value: T["value"];
  onChange: (value: T) => void;
};

export const FormRadio = <T extends { name: string; value: any }>(
  props: FormRadioProps<T>
) => {
  const { title, value: selected, data, onChange } = props;

  const [sizeOut, sizeIn] = [SIZES.content, SIZES.padding];

  return (
    <>
      <Text>{title}</Text>
      <BoxSpace />
      <Wrapper wrap style={{ justifyContent: "flex-start" }}>
        {data.map((radio) => {
          const { name, value } = radio;

          const isSelected = value === selected;
          const backgroundColor = isSelected ? COLORS.PINK : COLORS.WHITE;

          return (
            <Wrapper onClick={() => onChange(radio)} itemsCenter>
              <View
                itemsCenter
                justifyCenter
                width={sizeOut}
                height={sizeOut}
                style={{
                  backgroundColor: COLORS.PINK75,
                  borderRadius: SIZES._radiusRound,
                }}
              >
                <View
                  width={sizeIn}
                  height={sizeIn}
                  style={{
                    backgroundColor,
                    borderRadius: SIZES._radiusRound,
                  }}
                />
              </View>
              <BoxSpace />
              <Text flex>{name}</Text>
              <BoxSpace />
            </Wrapper>
          );
        })}
      </Wrapper>
      <BoxSpace b />
    </>
  );
};
