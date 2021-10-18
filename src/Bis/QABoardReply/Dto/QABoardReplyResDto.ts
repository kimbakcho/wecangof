import {NationControlResDto} from "@/Bis/NationControl/Dto/NationControlResDto";
import {MemberManagementSimpleResDto} from "@/Bis/MemberManagement/Dto/MemberManagementSimpleResDto";

export interface QABoardReplyResDto {
    id: number,
    nationName: NationControlResDto,
    qaBoardCategory: string,
    qaBoardId: QABoardReplyResDto,
    writer: MemberManagementSimpleResDto,
    content: string,
    updateDateTime: string,
    representativeComment: number
}
