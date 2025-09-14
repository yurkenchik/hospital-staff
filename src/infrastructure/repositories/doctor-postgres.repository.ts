import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DoctorOrmEntity } from "../orm-entities/doctor-orm.entity";
import { InsertResult, Repository } from "typeorm";
import { DoctorDomainEntity } from "@domain/doctor/entities/doctor-domain.entity";
import { DoctorOrmMapper } from "@core/mappers/orm/doctor-orm.mapper";
import { DoctorRepository } from "@domain/doctor/repositories/doctor.repository";
import { CreateDoctorDto } from "@domain/doctor/dto/request/create-doctor.dto";
import { UpdateDoctorDto } from "@domain/doctor/dto/request/update-doctor.dto";

@Injectable()
export class DoctorPostgresRepository implements DoctorRepository {
    constructor(
        @InjectRepository(DoctorOrmEntity)
        private readonly doctorRepository: Repository<DoctorOrmEntity>,
    ) {}

    async getDoctorById(id: string): Promise<DoctorDomainEntity | null> {
        const doctorOrmEntity = await this.doctorRepository
            .createQueryBuilder()
            .where("id = :id", { id })
            .getOne();

        if (!doctorOrmEntity) {
            return null;
        }
        return DoctorOrmMapper.toDomainEntity(doctorOrmEntity);
    }

    async getDoctors(): Promise<Array<DoctorDomainEntity>> {
        const doctorOrmEntities = await this.doctorRepository
            .createQueryBuilder()
            .getMany();

        return doctorOrmEntities.map(doctor => DoctorOrmMapper.toDomainEntity(doctor));
    }

    async createDoctor(createDoctorDto: CreateDoctorDto): Promise<DoctorDomainEntity> {
        const doctorInsertResult: InsertResult = await this.doctorRepository
            .createQueryBuilder()
            .insert()
            .into(DoctorOrmEntity)
            .values(createDoctorDto)
            .execute();

        const insertedDoctorId = doctorInsertResult.identifiers[doctorInsertResult.identifiers.length - 1].id;
        return this.getDoctorById(insertedDoctorId);
    }

    async updateDoctor(
        id: string,
        updateDoctorDto: UpdateDoctorDto
    ): Promise<DoctorDomainEntity> {
        await this.doctorRepository
            .createQueryBuilder()
            .update(DoctorOrmEntity)
            .set(updateDoctorDto)
            .where("id = :id", { id })
            .execute();

        return await this.getDoctorById(id);
    }

    async deleteDoctor(id: string): Promise<void> {
        await this.doctorRepository
            .createQueryBuilder()
            .delete()
            .from(DoctorOrmEntity)
            .where("id = :id", { id })
            .execute();
    }
}