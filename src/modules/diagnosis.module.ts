import {Module} from "@nestjs/common";
import {DiagnosisService} from "../infrastrcuture/services/diagnosis.service";
import {DiagnosisController} from "../presentation/controllers/diagnosis.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Diagnosis} from "../domain/entities/diagnosis.entity";

@Module({
    providers: [DiagnosisService],
    controllers: [DiagnosisController],
    imports: [TypeOrmModule.forFeature([Diagnosis])],
    exports: [DiagnosisService]
})
export class DiagnosisModule {}