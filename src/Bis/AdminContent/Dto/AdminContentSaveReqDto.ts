export interface AdminContentSaveReqDto {
    id?: number;
    title: string;
    markDown: string;
    html: string;
    category: string;
    orderIdx: number;
}
