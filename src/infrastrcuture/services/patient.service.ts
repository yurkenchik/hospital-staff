import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Patient} from "../../domain/entities/patient.entity";
import {InsertResult, Repository} from "typeorm";
import {CreatePatientDto} from "../../domain/dto/patient/create-patient.dto";
import {PatientRepository} from "../../domain/repositories/patient.repository";
import {PatientNotFoundException} from "../../common/exceptions/not-found/patient-not-found.exception";
import {Birthdate} from "../../domain/value-objects/birthdate.vo";
import {PhoneNumber} from "../../domain/value-objects/phone-number.vo";
import {UpdatePatientDto} from "../../domain/dto/patient/update-patient.dto";

@Injectable()
export class PatientService extends PatientRepository {
    constructor(
        @InjectRepository(Patient)
        private readonly patientRepository: Repository<Patient>,
    ) {
        super();
    }

    async getPatientById(patientId:string): Promise<Patient> {
        const patient = await this.patientRepository
            .createQueryBuilder()
            .where("id = :patientId", { patientId })
            .getOne();

        if (!patient) {
            throw new PatientNotFoundException();
        }
        return patient;
    }

    async getPatients(): Promise<Array<Patient>> {
        return this.patientRepository
            .createQueryBuilder()
            .getMany();
    }

    async createPatient(createPatientDto: CreatePatientDto): Promise<Patient> {
        const birthdate = new Birthdate(createPatientDto.birthDate).getValue();
        const phoneNumber = new PhoneNumber(createPatientDto.phoneNumber).getValue();

        const patient = this.patientRepository.create({
            ...createPatientDto,
            birthdate,
            phoneNumber,
        })

        return this.patientRepository.save(patient);
    }

    async updatePatient(patientId: string, updatePatientDto: UpdatePatientDto): Promise<Patient> {
        const doctor = await this.getPatientById(patientId);
        doctor.applyUpdates(updatePatientDto);

        await this.patientRepository
            .createQueryBuilder()
            .update(Patient)
            .set({
                ...updatePatientDto,
                birthdate: doctor.birthdate,
                phoneNumber: doctor.phoneNumber
            })
            .where("id = :doctorId", { doctorId: doctor.id })
            .execute();

        return doctor;
    }

    async deletePatient(patientId: string): Promise<void> {
        await this.patientRepository
            .createQueryBuilder()
            .delete()
            .from(Patient)
            .where("id = :patientId", { patientId })
            .execute();
    }
}