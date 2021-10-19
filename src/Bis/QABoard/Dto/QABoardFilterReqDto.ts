import {PageReqDto} from "@/Bis/Common/PageReqDto";

export interface QABoardFilterReqDto {
    mode?: string | null;
    title?: string | null;
    writer?: string | null;
    content?: string | null;
    nation?: string | null;
    category?: string | null;
    pageReqDto: PageReqDto;
}
