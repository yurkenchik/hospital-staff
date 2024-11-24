import {Module} from "@nestjs/common";
import {PatientService} from "../infrastrcuture/services/patient.service";
import {PatientController} from "../presentation/controllers/patient.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Patient} from "../domain/entities/patient.entity";

@Module({
    providers: [PatientService],
    controllers: [PatientController],
    imports: [TypeOrmModule.forFeature([Patient])],
    exports: [PatientService],
})
export class PatientModule {}