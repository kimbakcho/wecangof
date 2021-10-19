export interface PageableResDto {
    offset: number,
    pageNumber: number,
    pageSize: number,
    paged: boolean,
    sort: {
        empty: boolean,
        sorted: boolean,
        unsorted: boolean
    }
    unpaged: boolean
}
