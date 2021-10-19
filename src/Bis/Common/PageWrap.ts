import {PageableResDto} from "@/Bis/Common/PageableResDto";

export interface PageWrap<T> {
    content: T[],
    empty: boolean,
    first: boolean,
    last: boolean,
    number: number,
    numberOfElements: number,
    pageable: PageableResDto,
    size: number,
    sort:{
        empty: boolean,
        sorted: boolean,
        unsorted: boolean
    },
    totalElements: number,
    totalPages: number
}
