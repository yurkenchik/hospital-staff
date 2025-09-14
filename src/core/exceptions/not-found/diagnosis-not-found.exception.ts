import {HttpException, HttpStatus} from "@nestjs/common";

export class DiagnosisNotFoundException extends HttpException {
    constructor() {
        super("Diagnosis not found", HttpStatus.NOT_FOUND);
    }
}