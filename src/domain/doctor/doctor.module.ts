import { Module } from "@nestjs/common";
import { DoctorService } from "./services/doctor.service";
import { DoctorController } from "@presentation/http/doctor.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DoctorOrmEntity } from "@infrastructure/orm-entities/doctor-orm.entity";
import { DoctorPostgresRepository } from "@infrastructure/repositories/doctor-postgres.repository";
import { DOCTOR_REPOSITORY } from "./doctor.tokens";


@Module({
    providers: [
        { provide: DOCTOR_REPOSITORY, useClass: DoctorPostgresRepository },
        DoctorService
    ],
    controllers: [DoctorController],
    imports: [TypeOrmModule.forFeature([DoctorOrmEntity])],
    exports: [DoctorService]
})
export class DoctorModule {}