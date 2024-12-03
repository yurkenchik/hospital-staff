import {Module} from "@nestjs/common";
import {PatientNoteService} from "../infrastrcuture/services/patient-note.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PatientNote} from "../domain/entities/patient-note.entity";
import {PatientNoteController} from "../presentation/controllers/patient-note.controller";
import {Patient} from "../domain/entities/patient.entity";
import {PatientModule} from "./patient.module";

@Module({
    providers: [PatientNoteService],
    controllers: [PatientNoteController],
    imports: [
        TypeOrmModule.forFeature([PatientNote, Patient]),
        PatientModule
    ],
    exports: [PatientNoteService],
})
export class PatientNoteModule {}