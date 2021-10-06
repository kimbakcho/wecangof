import { RootState } from "./state";
import UserInfo from "@/Bis/Common/UserInfo";

// 뮤테이션 타입
export enum MutationTypes {
    SET_TOKEN = "SET_TOKEN",
    SET_ISLOGIN = "SET_ISLOGIN",
    SET_ISUSERINFO = "SET_USERINFO",
}

// 뮤테이션 속성 함수
export const mutations = {
    [MutationTypes.SET_TOKEN](state: RootState, token: string) {
        state.token = token;
    },
    [MutationTypes.SET_ISLOGIN](state: RootState, isLogin: boolean) {
        state.isLogin = isLogin;
    },
    [MutationTypes.SET_ISUSERINFO](state: RootState, userInfo: UserInfo) {
        state.userInfo = userInfo;
    },
};

export type Mutations = typeof mutations;
