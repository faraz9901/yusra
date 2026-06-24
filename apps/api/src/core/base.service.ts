import { db } from "../db";
import { Logger } from "./logger.service";

export class BaseService {
    public logger: Logger
    public db: typeof db

    constructor() {
        this.logger = new Logger(this.constructor.name || BaseService.name);
        this.db = db
    }


    sendOk(data: any, message: string = "Ok") {
        return {
            success: true,
            data: data,
            message: message,
            status: 200
        };
    }

    sendCreated(data: any, message: string = "Created") {
        return {
            success: true,
            data: data,
            message: message,
            status: 201
        };
    }
}