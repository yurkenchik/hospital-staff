import { ScheduleDomainEntity } from "../entities/schedule-domain.entity";
import { CreateScheduleDto } from "@domain/schedule/dto/request/create-schedule.dto";
import { UpdateScheduleDto } from "@domain/schedule/dto/request/update-schedule.dto";

export interface ScheduleRepository {
    getScheduleById(id: string): Promise<ScheduleDomainEntity | null>;
    getSchedules(): Promise<Array<ScheduleDomainEntity>>;
    getDoctorSchedules(doctorId: string): Promise<Array<ScheduleDomainEntity>>;
    createSchedule(doctorId: string, createScheduleDto: CreateScheduleDto): Promise<ScheduleDomainEntity>;
    updateSchedule(id: string, updateScheduleDto: UpdateScheduleDto): Promise<ScheduleDomainEntity>;
    deleteSchedule(id: string): Promise<void>;
}
