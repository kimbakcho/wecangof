export interface NationControlReqDto {
    continent?: string[];
    travelFlag?: boolean;
    visaFlag?: boolean;
    covidTest?: boolean;
    benefitsVaccination?: string[];
    possibleExempted?: boolean;
    mandatoryQuarantineTo?: number;
    mandatoryQuarantineFrom?: number;
}
