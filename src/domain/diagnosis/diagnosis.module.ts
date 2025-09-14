import {Module} from "@nestjs/common";
import {DiagnosisService} from "./services/diagnosis.service";
import {DiagnosisController} from "@presentation/http/diagnosis.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DiagnosisOrmEntity} from "@infrastructure/orm-entities/diagnosis-orm.entity";
import {DiagnosisPostgresRepository} from "@infrastructure/repositories/diagnosis-postgres.repository";

export const DIAGNOSIS_REPOSITORY = Symbol('DiagnosisRepository');

@Module({
    providers: [
        { provide: DIAGNOSIS_REPOSITORY, useClass: DiagnosisPostgresRepository },
        DiagnosisService
    ],
    controllers: [DiagnosisController],
    imports: [TypeOrmModule.forFeature([DiagnosisOrmEntity])],
    exports: [DiagnosisService]
})
export class DiagnosisModule {}