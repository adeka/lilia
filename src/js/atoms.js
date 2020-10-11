import { atom } from "recoil";

export const userState = atom({
  key: "user",
  default: null
});

export const ageState = atom({
  key: "age",
  default: 28
});

export const eggState = atom({
  key: "eggs",
  default: 2
});
