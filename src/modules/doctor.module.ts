import {Module} from "@nestjs/common";
import {DoctorService} from "../infrastrcuture/services/doctor.service";
import {DoctorController} from "../presentation/controllers/doctor.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Doctor} from "../domain/entities/doctor.entity";

@Module({
    providers: [DoctorService],
    controllers: [DoctorController],
    imports: [TypeOrmModule.forFeature([Doctor])],
    exports: [DoctorService]
})
export class DoctorModule {}