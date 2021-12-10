export default class  ImmigrationStatusUpdateReqDto {
    id!: number;
    nationFlagImageUrl!: string;
    nationFlagImageFileName!: string;
    continent?: string;
    travelFlag?: boolean;
    mandatoryQuarantine?: string;
    recommendedCountry!: boolean;
    recommendedCountryOrder!: number;
    recommendedCountryImageUrl?: string;
    recommendedCountryImageFileName?: string;
    vaccinationFlag?: number;
    pcrTest?: string;
    mandatoryQuarantineText?: string;
    visaFlag?: boolean;
    covidTest?: boolean;
    benefitsVaccination?: string;
    possibleExempted!: boolean;
    publicAnnouncement?: string;
}
