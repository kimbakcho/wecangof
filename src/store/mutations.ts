import { RootState } from "./state";
import UserInfo from "@/Bis/Common/UserInfo";
import {QABoardFilterReqDto} from "@/Bis/QABoard/Dto/QABoardFilterReqDto";
import {QABoardResDto} from "@/Bis/QABoard/Dto/QABoardResDto";
import {PageWrap} from "@/Bis/Common/PageWrap";
import {QABoardComResDto} from "@/Bis/QABoard/Dto/QABoardComResDto";

// 뮤테이션 타입
export enum MutationTypes {
    SET_TOKEN = "SET_TOKEN",
    SET_ISLOGIN = "SET_ISLOGIN",
    SET_ISUSERINFO = "SET_USERINFO",
    SET_QBOARD_FILTER = "SET_QBOARD_FILTER",
    SET_QACURRENTREPEAT_LIST = "SET_QACURRENTREPEAT_LIST",
    SET_QACURRENTREPEAT_PAGESTATUS = "SET_QACURRENTREPEAT_PAGESTATUS",
    SET_INOUTMODE = "SET_INOUTMODE",
    SET_QANDAMODE = "SET_QANDAMODE"
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
    [MutationTypes.SET_QBOARD_FILTER](state: RootState, filterReqDto: QABoardFilterReqDto) {
        state.qaBoardFilter = filterReqDto;
    },
    [MutationTypes.SET_QACURRENTREPEAT_LIST](state: RootState,list: QABoardComResDto[]){
        state.qaCurrentRepeatList = list;
    },
    [MutationTypes.SET_QACURRENTREPEAT_PAGESTATUS](state: RootState,pageStatue: PageWrap<QABoardComResDto>){
        state.qaCurrentRepeatPageState = pageStatue;
    },
    [MutationTypes.SET_INOUTMODE](state: RootState){
        state.inoutMode= true
        state.qAndAMode= false
    },
    [MutationTypes.SET_QANDAMODE](state: RootState){
        state.inoutMode= false
        state.qAndAMode= true
    }
};

export type Mutations = typeof mutations;
