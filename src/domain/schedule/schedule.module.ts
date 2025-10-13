import {Module} from "@nestjs/common";
import {ScheduleService} from "./services/schedule.service";
import {ScheduleController} from "@presentation/http/schedule.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ScheduleOrmEntity} from "@infrastructure/orm-entities/schedule-orm.entity";
import {SchedulePostgresRepository} from "@infrastructure/repositories/schedule-postgres.repository";
import {DoctorModule} from "../doctor/doctor.module";
import {SCHEDULE_REPOSITORY} from "./schedule.tokens";


@Module({
    providers: [
        { provide: SCHEDULE_REPOSITORY, useClass: SchedulePostgresRepository },
        ScheduleService
    ],
    controllers: [ScheduleController],
    imports: [
        TypeOrmModule.forFeature([ScheduleOrmEntity]),
        DoctorModule,
    ],
    exports: [ScheduleService]
})
export class ScheduleModule {}