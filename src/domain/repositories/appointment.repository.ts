import {Appointment} from "../entities/appointment.entity";
import {CreateAppointmentDto} from "../dto/appointment/create-appointment.dto";
import {UpdateAppointmentDto} from "../dto/appointment/update-appointment.dto";

export abstract class AppointmentRepository {
    abstract getAppointment(appointmentId: string, doctorId: string, patientId: string): Promise<Appointment>;
    abstract getAppointmentById(appointmentId: string): Promise<Appointment>;
    abstract getAppointments(): Promise<Array<Appointment>>;
    abstract getPatientAppointments(patientId: string): Promise<Array<Appointment>>;
    abstract getDoctorAppointments(patientId: string): Promise<Array<Appointment>>;
    abstract createAppointment(doctorId: string, patientId: string, createAppointmentDto: CreateAppointmentDto): Promise<Appointment>;
    abstract updateAppointment(appointmentId: string, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment>;
    abstract deleteAppointment(appointmentId: string): Promise<void>;
}