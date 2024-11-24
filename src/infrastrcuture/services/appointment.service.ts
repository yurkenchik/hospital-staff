import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {InsertResult, Repository} from "typeorm";
import {Appointment} from "../../domain/entities/appointment.entity";
import {AppointmentRepository} from "../../domain/repositories/appointment.repository";
import {CreateAppointmentDto} from "../../domain/dto/appointment/create-appointment.dto";
import {UpdateAppointmentDto} from "../../domain/dto/appointment/update-appointment.dto";
import {AppointmentNotFoundException} from "../../common/exceptions/not-found/appointment-not-found.exception";
import {DoctorService} from "./doctor.service";
import {PatientService} from "./patient.service";

@Injectable()
export class AppointmentService extends AppointmentRepository {
    constructor(
        @InjectRepository(Appointment)
        private readonly appointmentRepository: Repository<Appointment>,
        private readonly doctorService: DoctorService,
        private readonly patientService: PatientService,
    ) {
        super();
    }

    async getAppointmentById(appointmentId: string): Promise<Appointment> {
        const appointment = await this.appointmentRepository
            .createQueryBuilder()
            .where("id = :appointmentId", { appointmentId })
            .getOne();

        if (!appointment) {
            throw new AppointmentNotFoundException();
        }
        return appointment;
    }

    async getAppointment(appointmentId: string, doctorId: string, patientId: string): Promise<Appointment> {
        const appointment = await this.appointmentRepository
            .createQueryBuilder("appointment")
            .leftJoinAndSelect("appointment.doctor", "doctor")
            .leftJoinAndSelect("appointment.patient", "patient")
            .where("appointment.id = :appointmentId AND doctor.id = :doctorId AND patient.id = :patientId", {
                appointmentId,
                doctorId,
                patientId
            })
            .getOne();

        if (!appointment) {
            throw new AppointmentNotFoundException();
        }
        return appointment;
    }

    async getAppointments(): Promise<Array<Appointment>> {
        return this.appointmentRepository
            .createQueryBuilder()
            .getMany();
    }

    async getDoctorAppointments(doctorId: string): Promise<Array<Appointment>> {
        const doctor = await this.doctorService.getDoctorById(doctorId);

        return this.appointmentRepository
            .createQueryBuilder("appointment")
            .leftJoinAndSelect("appointment.doctor", "doctor")
            .where("doctor.id = doctorId", { doctorId: doctor.id })
            .getMany();
    }

    async getPatientAppointments(patientId: string): Promise<Array<Appointment>> {
        const patient = await this.patientService.getPatientById(patientId);

        return this.appointmentRepository
            .createQueryBuilder("appointment")
            .leftJoinAndSelect("appointment.patient", "patient")
            .where("patient.id = patient", { patientId: patient.id })
            .getMany();
    }

    async createAppointment(doctorId: string, patientId: string, createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
        const doctor = await this.doctorService.getDoctorById(doctorId);
        const patient = await this.patientService.getPatientById(patientId);

        const appointmentInsertResult: InsertResult = await this.appointmentRepository
            .createQueryBuilder()
            .insert()
            .into(Appointment)
            .values({
                ...createAppointmentDto,
                doctor,
                patient
            })
            .execute();

        const insertedAppointmentId = appointmentInsertResult.identifiers[appointmentInsertResult.identifiers.length - 1].id;
        return this.getAppointmentById(insertedAppointmentId);
    }

    async updateAppointment(appointmentId: string, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
        await this.appointmentRepository
            .createQueryBuilder()
            .update()
            .set(updateAppointmentDto)
            .where("id = :appointmentId", { appointmentId })
            .execute();

        return this.getAppointmentById(appointmentId);
    }

    async deleteAppointment(appointmentId: string): Promise<void> {
        await this.appointmentRepository
            .createQueryBuilder()
            .delete()
            .from(Appointment)
            .where("id = :appointmentId", { appointmentId })
            .execute();
    }
}