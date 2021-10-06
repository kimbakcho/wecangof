import {NationControlResDto} from "@/Bis/NationControl/Dto/NationControlResDto";
import {ImmigrationStatusSimpleResDto} from "@/Bis/ImmigrationStatus/Dto/ImmigrationStatusSimpleResDto";

export interface UserBookMarkingCountryResDto {
    id: number;
    nationId: NationControlResDto;
    subscriptionDateTime: string;
    orderIdx: number;
    immigrationStatusSimpleResDto: ImmigrationStatusSimpleResDto
}
