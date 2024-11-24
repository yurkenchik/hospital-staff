
export class CreateTreatmentDto {
    readonly treatmentDescription: string;
    readonly cost: number;
    readonly startDate: Date;
    readonly endDate: Date;
}