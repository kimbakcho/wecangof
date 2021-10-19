import {SortReqDto} from "@/Bis/Common/SortReqDto";

export interface PageReqDto {
    page: number;
    size: number;
    sorts?: SortReqDto[] | null
}
