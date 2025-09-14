import {HttpException, HttpStatus} from "@nestjs/common";

export class PatientNotFoundException extends HttpException {
    constructor() {
        super("Patient not found", HttpStatus.NOT_FOUND);
    }
}