import {QABoardReplyResDto} from "@/Bis/QABoardReply/Dto/QABoardReplyResDto";
import {MemberManagementSimpleResDto} from "@/Bis/MemberManagement/Dto/MemberManagementSimpleResDto";

export interface QABoardBadReplyReportResDto {
    idx: number,
    reply: QABoardReplyResDto,
    reportUser: MemberManagementSimpleResDto,
    reportTime: string
}
