import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {AppointmentDiagnosis} from "../../domain/entities/appointment-diagnosis.entity";
import {Repository} from "typeorm";
import {AppointmentService} from "./appointment.service";
import {DiagnosisService} from "./diagnosis.service";
import {
    AppointmentDiagnosisNotFoundException
} from "../../common/exceptions/not-found/appointment-diagnosis-not-found.exception";
import {CreateAppointmentDiagnosisDto} from "../../domain/dto/appointment-diagnosis/create-appointment-diagnosis.dto";
import {UpdateAppointmentDiagnosisDto} from "../../domain/dto/appointment-diagnosis/update-appointment-diagnosis.dto";
import {Appointment} from "../../domain/entities/appointment.entity";

@Injectable()
export class AppointmentDiagnosisService {
    constructor(
        @InjectRepository(AppointmentDiagnosis)
        private readonly appointmentDiagnosisRepository: Repository<AppointmentDiagnosis>,
        private readonly appointmentService: AppointmentService,
        private readonly diagnosisService: DiagnosisService,
        @InjectRepository(Appointment)
        private readonly appointmentRepository: Repository<Appointment>
    ) {}

    async getAppointmentDiagnosis(
        appointmentDiagnosisId: string,
        appointmentId: string,
        diagnosisId: string
    ): Promise<AppointmentDiagnosis> {
        const appointmentDiagnosis = await this.appointmentDiagnosisRepository
            .createQueryBuilder("appointmentDiagnosis")
            .leftJoinAndSelect("appointmentDiagnosis.appointment", "appointment")
            .leftJoinAndSelect("appointmentDiagnosis.diagnosis", "diagnosis")
            .leftJoinAndSelect("appointmentDiagnosis.treatments", "treatments")
            .leftJoinAndSelect("appointmentDiagnosis.notes", "notes")
            .leftJoinAndSelect("appointment.diagnoses", "relatedDiagnoses")
            .leftJoinAndSelect("diagnosis.appointments", "relatedAppointments")
            .where("appointmentDiagnosis.id = :appointmentDiagnosisId AND appointment.id = :appointmentId AND diagnosis.id = :diagnosisId", {
                appointmentDiagnosisId,
                appointmentId,
                diagnosisId,
            })
            .getOne();

        if (!appointmentDiagnosis) {
            throw new AppointmentDiagnosisNotFoundException();
        }
        return appointmentDiagnosis;
    }

    async getAllAppointmentsWithDiagnoses(): Promise<AppointmentDiagnosis[]> {
        return this.appointmentDiagnosisRepository
            .createQueryBuilder("appointmentDiagnosis")
            .leftJoinAndSelect("appointmentDiagnosis.appointment", "appointment")
            .leftJoinAndSelect("appointmentDiagnosis.diagnosis", "diagnosis")
            .leftJoinAndSelect("appointment.patients", "patient")
            .leftJoinAndSelect("appointment.doctors", "doctor")
            .leftJoinAndSelect("appointment.billings", "billing")
            .getMany();
    }

    async getAppointmentDiagnoses(
        appointmentId: string,
        diagnosisId: string
    ): Promise<Array<AppointmentDiagnosis>> {
        return await this.appointmentDiagnosisRepository
            .createQueryBuilder("appointmentDiagnosis")
            .leftJoinAndSelect("appointmentDiagnosis.appointment", "appointment")
            .leftJoinAndSelect("appointmentDiagnosis.diagnosis", "diagnosis")
            .where("appointment.id = :appointmentId AND diagnosis.id = :diagnosisId", {
                appointmentId,
                diagnosisId,
            })
            .getMany();
    }

    async createAppointmentDiagnosis(createAppointmentDiagnosisDto: CreateAppointmentDiagnosisDto): Promise<AppointmentDiagnosis> {
        const { appointmentId, diagnosisId } = createAppointmentDiagnosisDto;

        const appointment = await this.appointmentService.getAppointmentById(appointmentId);
        const diagnosis = await this.diagnosisService.getDiagnosisById(diagnosisId);

        const appointmentDiagnosisInsertResult = await this.appointmentDiagnosisRepository
            .createQueryBuilder()
            .insert()
            .into(AppointmentDiagnosis)
            .values({
                appointment,
                diagnosis
            })
            .execute();

        const insertedId = appointmentDiagnosisInsertResult.identifiers[appointmentDiagnosisInsertResult.identifiers.length - 1].id;
        return this.getAppointmentDiagnosis(insertedId, appointmentId, diagnosisId);
    }

    async updateAppointmentDiagnosis(
        id: string,
        updateAppointmentDiagnosisDto: UpdateAppointmentDiagnosisDto,
    ): Promise<AppointmentDiagnosis> {
        const { appointmentId, diagnosisId } = updateAppointmentDiagnosisDto;
        let appointment = null;
        let diagnosis = null;

        if (appointmentId) {
            appointment = await this.appointmentService.getAppointmentById(appointmentId);
        }

        if (diagnosisId) {
            diagnosis = await this.diagnosisService.getDiagnosisById(diagnosisId);
        }

        await this.appointmentDiagnosisRepository
            .createQueryBuilder()
            .update(AppointmentDiagnosis)
            .set({
                appointment: appointmentId ? appointment : undefined,
                diagnosis: diagnosisId ? diagnosis : undefined,
            })
            .where("id = :id", { id })
            .execute();

        return this.getAppointmentDiagnosis(id, appointmentId, diagnosisId);
    }

    async deleteAppointmentDiagnosis(appointmentDiagnosisId: string): Promise<void> {
        await this.appointmentDiagnosisRepository
            .createQueryBuilder()
            .delete()
            .from(AppointmentDiagnosis)
            .where("id = :appointmentDiagnosisId", { appointmentDiagnosisId })
            .execute();
    }
}