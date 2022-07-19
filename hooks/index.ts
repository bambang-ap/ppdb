export * from "./useAuth";
export * from "./useDataSiswa";

import { Dispatch, useEffect, useRef, useState } from "react";

type UseToggleRet = [
  boolean,
  (callback: boolean | ((state: boolean) => boolean)) => void
];

export const useToggle = (initState: boolean = false): UseToggleRet => {
  const [toggle, setToggle] = useState(initState);
  return [
    toggle,
    (callback) => {
      if (typeof callback === "function") {
        const newState = callback(toggle);
        setToggle(newState);
      } else {
        setToggle(callback);
      }
    },
  ];
};

export const useStateObject = <S extends MyObject<unknown>>(
  initState: S
): [state: S, dispatch: (newState: Partial<S>) => void] => {
  const keys = Object.keys(initState);
  let states = keys.reduce((ret, k) => {
    ret[k] = useState(initState[k]);
    return ret;
  }, {} as MyObject<ReturnType<typeof useState>>);
  const values = keys.reduce((ret, k) => {
    ret[k] = states[k][0];
    return ret;
  }, {} as MyObject<unknown>);
  const dispatch = keys.reduce((ret, k) => {
    ret[k] = states[k][1];
    return ret;
  }, {} as MyObject<Dispatch<unknown>>);
  const setters = (newState: Partial<S>) => {
    const keys = Object.keys(newState);
    keys.forEach((k) => {
      const value = newState[k];
      const dispathcer = dispatch[k];
      if (![value, dispathcer].includes(undefined)) dispatch[k](value);
    });
  };
  return [values as S, setters];
};

type UseArrayRet<T> = [
  T[],
  {
    push: (data: T | T[]) => void;
    remove: (index: number) => void;
    replace: (index: number, data: T) => void;
    initialize: (newData: T[]) => void;
  }
];

export const useArray = <T>(initialState: T[] = []): UseArrayRet<T> => {
  type Manager = UseArrayRet<T>[1];
  const [state, setState] = useState<T[]>(initialState);

  const initialize: Manager["initialize"] = (newData) => {
    setState(newData);
  };

  const push: Manager["push"] = (data) => {
    if (Array.isArray(data)) setState([...state, ...data]);
    else setState([...state, data]);
  };

  const replace: Manager["replace"] = (index, data) => {
    setState(state.replace(index, data));
  };

  const remove: Manager["remove"] = (index) => {
    setState(state.remove(index));
  };

  return [state, { replace, push, remove, initialize }];
};
