import {MemberManagementSimpleResDto} from "@/Bis/MemberManagement/Dto/MemberManagementSimpleResDto";
import {NationControlResDto} from "@/Bis/NationControl/Dto/NationControlResDto";

export interface AlarmTravelFlagResDto {
    id: number;
    userUid: MemberManagementSimpleResDto;
    nationId: NationControlResDto
}
