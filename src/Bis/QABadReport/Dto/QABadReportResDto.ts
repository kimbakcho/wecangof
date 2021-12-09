import {MemberManagementSimpleResDto} from "@/Bis/MemberManagement/Dto/MemberManagementSimpleResDto";

export interface QABadReportResDto {
    idx: number,
    qaDoc: QABadReportResDto,
    reportUser: MemberManagementSimpleResDto,
    reportTime: string
}
