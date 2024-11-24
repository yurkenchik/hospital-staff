import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {InsertResult, Repository} from 'typeorm';
import {Schedule} from "../../domain/entities/schedule.entity";
import {DoctorService} from "./doctor.service";
import {CreateScheduleDto} from "../../domain/dto/schedule/create-schedule.dto";
import {UpdateScheduleDto} from "../../domain/dto/schedule/update-schedule.dto";
import {ScheduleNotFoundException} from "../../common/exceptions/not-found/schedule-not-found.exception";

@Injectable()
export class ScheduleService{
    constructor(
        @InjectRepository(Schedule)
        private readonly scheduleRepository: Repository<Schedule>,
        private readonly doctorService: DoctorService,
    ) {}

    async getScheduleById(scheduleId: string): Promise<Schedule> {
        const schedule = await this.scheduleRepository
            .createQueryBuilder()
            .where("id = :scheduleId", { scheduleId })
            .getOne();

        if (!schedule) {
            throw new ScheduleNotFoundException();
        }
        return schedule;
    }

    async getSchedules(): Promise<Array<Schedule>> {
        return this.scheduleRepository
            .createQueryBuilder()
            .getMany();
    }

    async getDoctorSchedules(doctorId: string): Promise<Array<Schedule>> {
        const doctor = await this.doctorService.getDoctorById(doctorId);

        return this.scheduleRepository
            .createQueryBuilder("schedule")
            .leftJoinAndSelect("schedule.doctor", "doctor")
            .where("doctor.id = :doctorId", { doctorId: doctor.id })
            .getMany();
    }

    async createSchedule(doctorId: string, createScheduleDto: CreateScheduleDto): Promise<Schedule> {
        const doctor = await this.doctorService.getDoctorById(doctorId);

        const scheduleInsertResult: InsertResult = await this.scheduleRepository
            .createQueryBuilder()
            .insert()
            .into(Schedule)
            .values({
                ...createScheduleDto,
                doctor
            })
            .execute();

        const insertedScheduleId = scheduleInsertResult.identifiers[scheduleInsertResult.identifiers.length - 1].id;
        return this.getScheduleById(insertedScheduleId);
    }

    async updateSchedule(scheduleId: string, updateScheduleDto: UpdateScheduleDto): Promise<Schedule> {
        await this.scheduleRepository
            .createQueryBuilder()
            .update()
            .set(updateScheduleDto)
            .where("id = :scheduleId", { scheduleId })
            .execute();

        return this.getScheduleById(scheduleId);
    }

    async deleteSchedule(scheduleId: string): Promise<void> {
        await this.scheduleRepository
            .createQueryBuilder()
            .delete()
            .from(Schedule)
            .where("id = :scheduleId", { scheduleId })
            .execute();
    }
}
