import {MemberManagementSimpleResDto} from "@/Bis/MemberManagement/Dto/MemberManagementSimpleResDto";
import {QABoardResDto} from "@/Bis/QABoard/Dto/QABoardResDto";

export interface QABadReportResDto {
    idx: number,
    qaDoc: QABoardResDto,
    reportUser: MemberManagementSimpleResDto,
    reportTime: string
}
