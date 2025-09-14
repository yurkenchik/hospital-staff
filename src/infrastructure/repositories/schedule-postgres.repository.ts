import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, Repository } from "typeorm";
import { ScheduleOrmEntity } from "@infrastructure/orm-entities/schedule-orm.entity";
import { ScheduleDomainEntity } from "@domain/schedule/entities/schedule-domain.entity";
import { ScheduleOrmMapper } from "@core/mappers/orm/schedule-orm.mapper";
import { ScheduleRepository } from "@domain/schedule/repositories/schedule.repository";
import { CreateScheduleDto } from "@domain/schedule/dto/request/create-schedule.dto";
import { UpdateScheduleDto } from "@domain/schedule/dto/request/update-schedule.dto";

@Injectable()
export class SchedulePostgresRepository implements ScheduleRepository {
    constructor(
        @InjectRepository(ScheduleOrmEntity)
        private readonly scheduleRepository: Repository<ScheduleOrmEntity>,
    ) {}

    async getScheduleById(id: string): Promise<ScheduleDomainEntity | null> {
        const scheduleOrmEntity = await this.scheduleRepository
            .createQueryBuilder()
            .where("id = :id", { id })
            .getOne();

        if (!scheduleOrmEntity) {
            return null;
        }
        return ScheduleOrmMapper.toDomainEntity(scheduleOrmEntity);
    }

    async getSchedules(): Promise<Array<ScheduleDomainEntity>> {
        const scheduleOrmEntities = await this.scheduleRepository
            .createQueryBuilder()
            .getMany();

        return scheduleOrmEntities.map(schedule => ScheduleOrmMapper.toDomainEntity(schedule));
    }

    async getDoctorSchedules(doctorId: string): Promise<Array<ScheduleDomainEntity>> {
        const scheduleOrmEntities = await this.scheduleRepository
            .createQueryBuilder("schedule")
            .leftJoinAndSelect("schedule.doctor", "doctor")
            .where("doctor.id = :doctorId", { doctorId })
            .getMany();

        return scheduleOrmEntities.map(schedule => ScheduleOrmMapper.toDomainEntity(schedule));
    }

    async createSchedule(doctorId: string, createScheduleDto: CreateScheduleDto): Promise<ScheduleDomainEntity> {
        const scheduleInsertResult: InsertResult = await this.scheduleRepository
            .createQueryBuilder()
            .insert()
            .into(ScheduleOrmEntity)
            .values({
                ...createScheduleDto,
                doctor: { id: doctorId } as any
            })
            .execute();

        const insertedScheduleId = scheduleInsertResult.identifiers[scheduleInsertResult.identifiers.length - 1].id;
        return this.getScheduleById(insertedScheduleId);
    }

    async updateSchedule(id: string, updateScheduleDto: UpdateScheduleDto): Promise<ScheduleDomainEntity> {
        await this.scheduleRepository
            .createQueryBuilder()
            .update(ScheduleOrmEntity)
            .set(updateScheduleDto)
            .where("id = :id", { id })
            .execute();

        return this.getScheduleById(id);
    }

    async deleteSchedule(id: string): Promise<void> {
        await this.scheduleRepository
            .createQueryBuilder()
            .delete()
            .from(ScheduleOrmEntity)
            .where("id = :id", { id })
            .execute();
    }
}
