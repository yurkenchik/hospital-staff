import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {InsertResult, Repository} from 'typeorm';
import {ScheduleOrmEntity} from "@infrastructure/orm-entities/schedule-orm.entity";
import {DoctorService} from "@domain/doctor/services/doctor.service";
import {CreateScheduleDto} from "../dto/request/create-schedule.dto";
import {UpdateScheduleDto} from "../dto/request/update-schedule.dto";
import {ScheduleNotFoundException} from "@core/exceptions/not-found/schedule-not-found.exception";
import {ScheduleDomainEntity} from "../entities/schedule-domain.entity";
import {ScheduleRepository} from "../repositories/schedule.repository";
import {SCHEDULE_REPOSITORY} from "../schedule.module";

@Injectable()
export class ScheduleService{
    constructor(
        @Inject(forwardRef(() => SCHEDULE_REPOSITORY))
        private readonly scheduleRepository: ScheduleRepository,
        private readonly doctorService: DoctorService,
    ) {}

    async getScheduleById(scheduleId: string): Promise<ScheduleDomainEntity> {
        const schedule = await this.scheduleRepository.getScheduleById(scheduleId);
        if (!schedule) {
            throw new ScheduleNotFoundException();
        }
        return schedule;
    }

    async getSchedules(): Promise<Array<ScheduleDomainEntity>> {
        return this.scheduleRepository.getSchedules();
    }

    async getDoctorSchedules(doctorId: string): Promise<Array<ScheduleDomainEntity>> {
        const doctor = await this.doctorService.getDoctorById(doctorId);
        return this.scheduleRepository.getDoctorSchedules(doctor.id);
    }

    async createSchedule(doctorId: string, createScheduleDto: CreateScheduleDto): Promise<ScheduleDomainEntity> {
        const doctor = await this.doctorService.getDoctorById(doctorId);
        return await this.scheduleRepository.createSchedule(doctor.id, createScheduleDto);
    }

    async updateSchedule(scheduleId: string, updateScheduleDto: UpdateScheduleDto): Promise<ScheduleDomainEntity> {
        return await this.scheduleRepository.updateSchedule(scheduleId, updateScheduleDto);
    }

    async deleteSchedule(scheduleId: string): Promise<void> {
        await this.scheduleRepository.deleteSchedule(scheduleId);
    }
}
