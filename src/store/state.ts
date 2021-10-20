import UserInfo from "@/Bis/Common/UserInfo";
import {QABoardFilterReqDto} from "@/Bis/QABoard/Dto/QABoardFilterReqDto";
import {QABoardResDto} from "@/Bis/QABoard/Dto/QABoardResDto";
import {PageWrap} from "@/Bis/Common/PageWrap";
import {QABoardComResDto} from "@/Bis/QABoard/Dto/QABoardComResDto";

export const state = {
    token: '',
    isLogin: false,
    userInfo: {} as UserInfo,
    qaBoardFilter: {} as QABoardFilterReqDto,
    qaCurrentRepeatList: [] as QABoardComResDto[],
    qaCurrentRepeatPageState: {} as PageWrap<QABoardComResDto>,
    inoutMode: true,
    qAndAMode: false,
}

export type RootState = typeof state;
