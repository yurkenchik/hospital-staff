import {HttpException, HttpStatus} from "@nestjs/common";

export class AppointmentNotFoundException extends  HttpException {
    constructor() {
        super("Appointment not found", HttpStatus.NOT_FOUND);
    }
}