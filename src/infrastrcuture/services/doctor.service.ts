import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {InsertResult, Repository} from "typeorm";
import {Doctor} from "../../domain/entities/doctor.entity";
import {DoctorRepository} from "../../domain/repositories/doctor.repository";
import {DoctorNotFoundException} from "../../common/exceptions/not-found/doctor-not-found.exception";
import {CreateDoctorDto} from "../../domain/dto/doctor/create-doctor.dto";
import {Email} from "../../domain/value-objects/email.vo";
import {PhoneNumber} from "../../domain/value-objects/phone-number.vo";
import {UpdateDoctorDto} from "../../domain/dto/doctor/update-doctor.dto";

@Injectable()
export class DoctorService extends DoctorRepository {
    constructor(
        @InjectRepository(Doctor)
        private readonly doctorRepository: Repository<Doctor>,
    ) {
        super();
    }

    async getDoctorById(doctorId: string): Promise<Doctor> {
        const doctor = await this.doctorRepository
            .createQueryBuilder()
            .where("id = :doctorId", { doctorId })
            .getOne();

        if (!doctor) {
            throw new DoctorNotFoundException();
        }
        return doctor;
    }

    async getDoctors(): Promise<Array<Doctor>> {
        return this.doctorRepository
            .createQueryBuilder()
            .getMany();
    }

    async createDoctor(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
        const email = new Email(createDoctorDto.email).getValue();
        const phoneNumber = new PhoneNumber(createDoctorDto.phoneNumber).getValue();

        const doctorInsertResult: InsertResult = await this.doctorRepository
            .createQueryBuilder()
            .insert()
            .into(Doctor)
            .values({
                ...createDoctorDto,
                email,
                phoneNumber
            })
            .execute();

        const insertedDoctorId = doctorInsertResult.identifiers[doctorInsertResult.identifiers.length - 1].id;
        return this.getDoctorById(insertedDoctorId);
    }

    async updateDoctor(doctorId: string, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
        const doctor = await this.getDoctorById(doctorId);
        doctor.applyUpdates(updateDoctorDto);

        await this.doctorRepository
            .createQueryBuilder()
            .update(Doctor)
            .set({
                ...updateDoctorDto,
                email: doctor.email,
                phoneNumber: doctor.phoneNumber
            })
            .where("id = :doctorId", { doctorId: doctor.id })
            .execute();

        return doctor;
    }

    async deleteDoctor(doctorId: string): Promise<void> {
        await this.doctorRepository
            .createQueryBuilder()
            .delete()
            .from(Doctor)
            .where("id = :doctorId", { doctorId })
            .execute();
    }
}