import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, Repository } from "typeorm";
import { AppointmentOrmEntity } from "@infrastructure/orm-entities/appointment-orm.entity";
import { AppointmentDomainEntity } from "@domain/appointment/entities/appointment-domain.entity";
import { AppointmentOrmMapper } from "@core/mappers/orm/appointment-orm.mapper";
import { AppointmentRepository } from "@domain/appointment/repositories/appointment.repository";
import { CreateAppointmentDto } from "@domain/appointment/dto/request/create-appointment.dto";
import { UpdateAppointmentDto } from "@domain/appointment/dto/request/update-appointment.dto";

@Injectable()
export class AppointmentPostgresRepository implements AppointmentRepository {
    constructor(
        @InjectRepository(AppointmentOrmEntity)
        private readonly appointmentRepository: Repository<AppointmentOrmEntity>,
    ) {}

    async getAppointmentById(id: string): Promise<AppointmentDomainEntity | null> {
        const appointmentOrmEntity = await this.appointmentRepository
            .createQueryBuilder()
            .where("id = :id", { id })
            .getOne();

        if (!appointmentOrmEntity) {
            return null;
        }
        return AppointmentOrmMapper.toDomainEntity(appointmentOrmEntity);
    }

    async getAppointment(appointmentId: string, doctorId: string, patientId: string): Promise<AppointmentDomainEntity | null> {
        const appointmentOrmEntity = await this.appointmentRepository
            .createQueryBuilder("appointment")
            .leftJoinAndSelect("appointment.doctor", "doctor")
            .leftJoinAndSelect("appointment.patient", "patient")
            .where("appointment.id = :appointmentId AND doctor.id = :doctorId AND patient.id = :patientId", {
                appointmentId,
                doctorId,
                patientId
            })
            .getOne();

        if (!appointmentOrmEntity) {
            return null;
        }
        return AppointmentOrmMapper.toDomainEntity(appointmentOrmEntity);
    }

    async getAppointments(): Promise<Array<AppointmentDomainEntity>> {
        const appointmentOrmEntities = await this.appointmentRepository
            .createQueryBuilder()
            .getMany();

        return appointmentOrmEntities.map(appointment => AppointmentOrmMapper.toDomainEntity(appointment));
    }

    async getDoctorAppointments(doctorId: string): Promise<Array<AppointmentDomainEntity>> {
        const appointmentOrmEntities = await this.appointmentRepository
            .createQueryBuilder("appointment")
            .leftJoinAndSelect("appointment.doctor", "doctor")
            .where("doctor.id = :doctorId", { doctorId })
            .getMany();

        return appointmentOrmEntities.map(appointment => AppointmentOrmMapper.toDomainEntity(appointment));
    }

    async getPatientAppointments(patientId: string): Promise<Array<AppointmentDomainEntity>> {
        const appointmentOrmEntities = await this.appointmentRepository
            .createQueryBuilder("appointment")
            .leftJoinAndSelect("appointment.patient", "patient")
            .where("patient.id = :patientId", { patientId })
            .getMany();

        return appointmentOrmEntities.map(appointment => AppointmentOrmMapper.toDomainEntity(appointment));
    }

    async createAppointment(doctorId: string, patientId: string, createAppointmentDto: CreateAppointmentDto): Promise<AppointmentDomainEntity> {
        const appointmentInsertResult: InsertResult = await this.appointmentRepository
            .createQueryBuilder()
            .insert()
            .into(AppointmentOrmEntity)
            .values({
                ...createAppointmentDto,
                doctor: { id: doctorId } as any,
                patient: { id: patientId } as any
            })
            .execute();

        const insertedAppointmentId = appointmentInsertResult.identifiers[appointmentInsertResult.identifiers.length - 1].id;
        return this.getAppointmentById(insertedAppointmentId);
    }

    async updateAppointment(appointmentId: string, updateAppointmentDto: UpdateAppointmentDto): Promise<AppointmentDomainEntity> {
        await this.appointmentRepository
            .createQueryBuilder()
            .update(AppointmentOrmEntity)
            .set(updateAppointmentDto)
            .where("id = :appointmentId", { appointmentId })
            .execute();

        return this.getAppointmentById(appointmentId);
    }

    async deleteAppointment(appointmentId: string): Promise<void> {
        await this.appointmentRepository
            .createQueryBuilder()
            .delete()
            .from(AppointmentOrmEntity)
            .where("id = :appointmentId", { appointmentId })
            .execute();
    }
}
