import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { AppointmentRepository } from "../repositories/appointment.repository";
import { CreateAppointmentDto } from "../dto/request/create-appointment.dto";
import { UpdateAppointmentDto } from "../dto/request/update-appointment.dto";
import { AppointmentNotFoundException } from "@core/exceptions/not-found/appointment-not-found.exception";
import { DoctorService } from "@domain/doctor/services/doctor.service";
import { PatientService } from "@domain/patient/services/patient.service";
import { AppointmentDomainEntity } from "../entities/appointment-domain.entity";
import { APPOINTMENT_REPOSITORY } from "@domain/appointment/appointment.tokens";

@Injectable()
export class AppointmentService {
    constructor(
        @Inject(APPOINTMENT_REPOSITORY)
        private readonly appointmentRepository: AppointmentRepository,
        private readonly doctorService: DoctorService,
        private readonly patientService: PatientService,
    ) {}

    async getAppointmentById(appointmentId: string): Promise<AppointmentDomainEntity> {
        const appointment = await this.appointmentRepository.getAppointmentById(appointmentId);
        if (!appointment) {
            throw new AppointmentNotFoundException();
        }
        return appointment;
    }

    async getAppointment(appointmentId: string, doctorId: string, patientId: string): Promise<AppointmentDomainEntity> {
        const appointment = await this.appointmentRepository.getAppointment(appointmentId, doctorId, patientId);
        if (!appointment) {
            throw new AppointmentNotFoundException();
        }
        return appointment;
    }

    async getAppointments(): Promise<Array<AppointmentDomainEntity>> {
        return this.appointmentRepository.getAppointments();
    }

    async getDoctorAppointments(doctorId: string): Promise<Array<AppointmentDomainEntity>> {
        const doctor = await this.doctorService.getDoctorById(doctorId);
        return this.appointmentRepository.getDoctorAppointments(doctor.id);
    }

    async getPatientAppointments(patientId: string): Promise<Array<AppointmentDomainEntity>> {
        const patient = await this.patientService.getPatientById(patientId);
        return this.appointmentRepository.getPatientAppointments(patient.id);
    }

    async createAppointment(doctorId: string, patientId: string, createAppointmentDto: CreateAppointmentDto): Promise<AppointmentDomainEntity> {
        const doctor = await this.doctorService.getDoctorById(doctorId);
        const patient = await this.patientService.getPatientById(patientId);

        return await this.appointmentRepository.createAppointment(doctor.id, patient.id, createAppointmentDto);
    }

    async updateAppointment(appointmentId: string, updateAppointmentDto: UpdateAppointmentDto): Promise<AppointmentDomainEntity> {
        return await this.appointmentRepository.updateAppointment(appointmentId, updateAppointmentDto);
    }

    async deleteAppointment(appointmentId: string): Promise<void> {
        await this.appointmentRepository.deleteAppointment(appointmentId);
    }
}