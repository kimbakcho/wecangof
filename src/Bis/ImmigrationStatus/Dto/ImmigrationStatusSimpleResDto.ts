import {NationControlResDto} from "@/Bis/NationControl/Dto/NationControlResDto";

export interface ImmigrationStatusSimpleResDto {
    id: number
    nation: NationControlResDto;
    continent: string;
    travelFlag: boolean;
    mandatoryQuarantine: string;
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
}
