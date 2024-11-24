import {Module} from "@nestjs/common";
import {ScheduleService} from "../infrastrcuture/services/schedule.service";
import {ScheduleController} from "../presentation/controllers/schedule.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Schedule} from "../domain/entities/schedule.entity";
import {DoctorModule} from "./doctor.module";

@Module({
    providers: [ScheduleService],
    controllers: [ScheduleController],
    imports: [
        TypeOrmModule.forFeature([Schedule]),
        DoctorModule,
    ],
    exports: [ScheduleService]
})
export class ScheduleModule {}