import {HttpException, HttpStatus} from "@nestjs/common";

export class MedicalRecordNotFoundException extends HttpException {
    constructor() {
        super("Medical record not found", HttpStatus.NOT_FOUND);
    }
}