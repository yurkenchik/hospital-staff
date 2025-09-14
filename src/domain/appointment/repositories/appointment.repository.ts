import { AppointmentDomainEntity } from "../entities/appointment-domain.entity";
import { CreateAppointmentDto } from "@domain/appointment/dto/request/create-appointment.dto";
import { UpdateAppointmentDto } from "@domain/appointment/dto/request/update-appointment.dto";

export interface AppointmentRepository {
    getAppointmentById(id: string): Promise<AppointmentDomainEntity | null>;
    getAppointment(appointmentId: string, doctorId: string, patientId: string): Promise<AppointmentDomainEntity | null>;
    getAppointments(): Promise<Array<AppointmentDomainEntity>>;
    getDoctorAppointments(doctorId: string): Promise<Array<AppointmentDomainEntity>>;
    getPatientAppointments(patientId: string): Promise<Array<AppointmentDomainEntity>>;
    createAppointment(doctorId: string, patientId: string, createAppointmentDto: CreateAppointmentDto): Promise<AppointmentDomainEntity>;
    updateAppointment(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<AppointmentDomainEntity>;
    deleteAppointment(id: string): Promise<void>;
}
