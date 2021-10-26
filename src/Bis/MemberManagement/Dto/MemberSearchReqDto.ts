import {PageReqDto} from "@/Bis/Common/PageReqDto";

export interface MemberSearchReqDto {
    nickName?: string | null,
    pageReqDto: PageReqDto;
}
