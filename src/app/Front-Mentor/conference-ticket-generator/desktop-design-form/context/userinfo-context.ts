import { createContext } from "react";
import { UserInfo } from "../../types";

export type UserInfoContextType = {
    userInfo: UserInfo;
    setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
  };

export const userinfoContext = createContext<undefined | UserInfoContextType>(undefined)