import { selector } from "recoil";
import { anAtom } from "./Atoms";

export const sliceAnAtom = selector({
    key: 'sliceAnAtom',
    get: ({get}) => {
      const text = get(anAtom);
      return text.slice(0,1) + text.slice(3,4) + text.slice(-2, -1)
    }
  })