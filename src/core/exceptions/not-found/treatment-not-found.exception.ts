import {HttpException, HttpStatus} from "@nestjs/common";

export class TreatmentNotFoundException extends HttpException {
    constructor() {
        super("Treatment not found", HttpStatus.NOT_FOUND);
    }
}