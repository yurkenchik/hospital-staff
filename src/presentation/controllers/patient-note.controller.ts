import {Body, Controller, Param, Post} from "@nestjs/common";
import {PatientNoteService} from "../../infrastrcuture/services/patient-note.service";
import {CreatePatientNoteDto} from "../../domain/dto/patient-note/create-patient-note.dto";

@Controller('patient-note')
export class PatientNoteController {
    constructor(private readonly patientNoteService: PatientNoteService) {}

    @Post(":userId")
    async createPatientNote(@Param("userId") userId: string, @Body() createPatientNoteDto: CreatePatientNoteDto) {
        return this.patientNoteService.createPatientNote(userId, createPatientNoteDto);
    }
}