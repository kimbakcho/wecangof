import {MemberManagementSimpleResDto} from "@/Bis/MemberManagement/Dto/MemberManagementSimpleResDto";
import {NationControlResDto} from "@/Bis/NationControl/Dto/NationControlResDto";

export interface UserAlarmResDto {
    id: number,
    userUid: MemberManagementSimpleResDto,
    message: string,
    sendDateTime: string;
    readFlag: boolean,
    relationNationId: NationControlResDto

}
