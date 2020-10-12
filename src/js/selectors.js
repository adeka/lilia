import { selector } from "recoil";
import { userState } from "JS/atoms";

export const userSelector = selector({
  key: "currentUser",
  get: ({ get }) => {
    const user = get(userState);
    return user;
  }
});
