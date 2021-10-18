import {NationControlResDto} from "@/Bis/NationControl/Dto/NationControlResDto";
import {MemberManagementSimpleResDto} from "@/Bis/MemberManagement/Dto/MemberManagementSimpleResDto";

export interface QABoardResDto {
    id: number;
    classificationQuestions: string;
    nationName: NationControlResDto | null;
    writer: MemberManagementSimpleResDto;
    title: string;
    contentText: string;
    contentImageUrl: string;
    replyCount: number;
    view: number;
    updateDateTime: string;
    representative: number;
}
