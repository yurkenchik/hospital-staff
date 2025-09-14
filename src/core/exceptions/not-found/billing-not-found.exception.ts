import {HttpException, HttpStatus} from "@nestjs/common";

export class BillingNotFoundException extends HttpException {
    constructor() {
        super("Billing not found", HttpStatus.NOT_FOUND);
    }
}