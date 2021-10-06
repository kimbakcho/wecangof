import UserInfo from "@/Bis/Common/UserInfo";

export const state = {
    token: '',
    isLogin: false,
    userInfo: {} as UserInfo
}

export type RootState = typeof state;
