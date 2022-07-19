type ToString<R extends string, L extends string = ""> = `${L}${R}`;
type CamelCase<
  Separator extends string,
  S extends string
> = S extends `${infer P1}${Separator}${infer P2}${infer P3}`
  ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<Separator, P3>}`
  : Lowercase<S>;
type KeysToCamelCase<S extends string, T> = {
  [K in keyof T as CamelCase<S, string & K>]: T[K] extends {}
    ? KeysToCamelCase<S, T[K]>
    : T[K];
};
type ObjFromTuple<
  T extends string,
  S extends string = "",
  Type = boolean,
  Separator extends string = "-"
> = KeysToCamelCase<Separator, Record<ToString<T, S>, Type>>;

type MyObject<T = string> = Record<string, T>;

interface Array<T> {
  replace: (index: number, data: T) => T[];
  remove: (index: number) => T[];
}
