import { atom } from "recoil";

export const userState = atom({
  key: "user",
  default: null
});

export const ageState = atom({
  key: "age",
  default: 35
});

export const eggState = atom({
  key: "eggs",
  default: 10
});

export const graphState = atom({
  key: "graph",
  default: "eggs"
});

export const showResultState = atom({
  key: "result",
  default: false
});
