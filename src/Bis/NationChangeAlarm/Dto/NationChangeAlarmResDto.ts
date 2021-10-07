import {MemberManagementSimpleResDto} from "@/Bis/MemberManagement/Dto/MemberManagementSimpleResDto";
import {NationControlResDto} from "@/Bis/NationControl/Dto/NationControlResDto";

export interface NationChangeAlarmResDto {
    id: number,
    userUid: MemberManagementSimpleResDto,
    nationControl: NationControlResDto,
    createTime: string
}
