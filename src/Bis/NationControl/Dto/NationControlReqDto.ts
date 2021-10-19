export interface NationControlReqDto {
    continent?: string[] | null;
    travelFlag?: boolean | null;
    visaFlag?: boolean | null;
    covidTest?: boolean | null;
    benefitsVaccination?: string[] | null;
    possibleExempted?: boolean | null;
    mandatoryQuarantine?: string[] | null;
}
