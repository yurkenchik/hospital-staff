import { TreatmentDomainEntity } from "../entities/treatment-domain.entity";
import { CreateTreatmentDto } from "@domain/treatment/dto/request/create-treatment.dto";
import { UpdateTreatmentDto } from "@domain/treatment/dto/request/update-treatment.dto";

export interface TreatmentRepository {
    getTreatmentById(id: string): Promise<TreatmentDomainEntity | null>;
    getTreatments(): Promise<Array<TreatmentDomainEntity>>;
    createTreatment(createTreatmentDto: CreateTreatmentDto): Promise<TreatmentDomainEntity>;
    updateTreatment(id: string, updateTreatmentDto: UpdateTreatmentDto): Promise<TreatmentDomainEntity>;
    deleteTreatment(id: string): Promise<void>;
}
