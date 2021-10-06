import {NationControlResDto} from "@/Bis/NationControl/Dto/NationControlResDto";
import { ImmigrationInfoManagementResDto } from "./ImmigrationInfoManagementResDto";

export interface ImmigrationStatusDetailResDto {
    id: number;
    nation: NationControlResDto;
    continent: string;
    travelFlag: boolean;
    mandatoryQuarantine: number;
    updateDateTime: string;
    recommendedCountry: boolean;
    recommendedCountryOrder: number;
    recommendedCountryImageUrl: string;
    vaccinationFlag: number;
    pcrTest: string;
    mandatoryQuarantineText: string;
    visaFlag: boolean;
    covidTest: boolean;
    benefitsVaccination: string;
    possibleExempted: boolean;
    vaccinatedLeavesCountry: ImmigrationInfoManagementResDto;
    vaccinatedReturnHome: ImmigrationInfoManagementResDto ;
    unvaccinatedLeavesCountry: ImmigrationInfoManagementResDto ;
    unvaccinatedReturnHome: ImmigrationInfoManagementResDto ;
}
