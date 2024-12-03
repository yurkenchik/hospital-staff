import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {PatientNote} from "../../domain/entities/patient-note.entity";
import {InsertResult, Repository} from "typeorm";
import {CreatePatientNoteDto} from "../../domain/dto/patient-note/create-patient-note.dto";
import {PatientService} from "./patient.service";

@Injectable()
export class PatientNoteService {
    constructor(
        @InjectRepository(PatientNote)
        private readonly patientNoteRepository: Repository<PatientNote>,
        private readonly patientService: PatientService,
    ) {}

    async createPatientNote(patientId: string, createPatientNoteDto: CreatePatientNoteDto): Promise<PatientNote> {
        const patient = await this.patientService.getPatientById(patientId);

        const patientNoteInsertResult: InsertResult = await this.patientNoteRepository
            .createQueryBuilder()
            .insert()
            .into(PatientNote)
            .values({
                ...createPatientNoteDto,
                patient: patient,
                patientId,
            })
            .execute();

        const patientNoteId: string = patientNoteInsertResult.identifiers[0].id;

        return this.patientNoteRepository.findOne({ where: { id: patientNoteId } });
    }
}