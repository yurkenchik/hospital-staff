import {HttpException, HttpStatus} from "@nestjs/common";

export class AppointmentDiagnosisNotFoundException extends HttpException {
    constructor() {
        super("Appointment diagnosis not found", HttpStatus.NOT_FOUND);
    }

}