/// <reference path="type.d.ts" />

Array.prototype.replace = function (index, data) {
  const state = this;
  const dataL = state.slice(0, index);
  const dataR = state.slice(index + 1);
  if (index >= 0 && index < state?.length) return [...dataL, data, ...dataR];
  return state;
};

Array.prototype.remove = function (index) {
  const state = this;
  const dataL = state.slice(0, index);
  const dataR = state.slice(index + 1);
  if (index > 0) return [...dataL, ...dataR];
  else return dataR;
};

export {};
