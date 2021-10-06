import {NationControlResDto} from "@/Bis/NationControl/Dto/NationControlResDto";

export interface ImmigrationInfoManagementResDto {
    id: number;
    nationId: NationControlResDto ;
    classification: string;
    contentMarkDown: string;
    contentHtml: string;
    updateDateTime: string;
}
