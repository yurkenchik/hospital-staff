import {Treatment} from "../entities/treatment.entity";
import {CreateTreatmentDto} from "../dto/treatment/create-treatment.dto";
import {UpdateTreatmentDto} from "../dto/treatment/update-treatment.dto";

export abstract class TreatmentRepository {
    abstract getTreatmentById(treatmentId: string): Promise<Treatment>;
    abstract getTreatments(): Promise<Array<Treatment>>;
    abstract createTreatment(createTreatmentDto: CreateTreatmentDto): Promise<Treatment>;
    abstract updateTreatment(treatmentId: string, updateTreatmentDto: UpdateTreatmentDto): Promise<Treatment>;
    abstract deleteTreatment(treatmentId: string): Promise<void>;
}