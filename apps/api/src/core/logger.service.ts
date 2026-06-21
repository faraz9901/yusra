import { requestContext } from "@fastify/request-context";
import { FastifyReply, FastifyRequest } from "fastify";

enum LogLevel {
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR",
    DEBUG = "DEBUG",
}

export class Logger {
    constructor(private context: string) { }

    private log(
        level: LogLevel,
        message: string,
        meta?: unknown,
    ) {
        const requestId = (requestContext as any).get("requestId") ?? "SYSTEM";

        const timestamp = new Date().toLocaleString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });

        const parts = [
            `[${timestamp}]`,
            `[${level}]`,
            `[${this.context}]`,
            `[${requestId}]`,
            message,
        ];

        if (meta) {
            parts.push(JSON.stringify(meta));
        }

        console.log(parts.join(" "));
    }

    info(message: string, meta?: unknown) {
        this.log(LogLevel.INFO, message, meta);
    }

    warn(message: string, meta?: unknown) {
        this.log(LogLevel.WARN, message, meta);
    }

    error(message: string, meta?: unknown) {
        this.log(LogLevel.ERROR, message, meta);
    }

    debug(message: string, meta?: unknown) {
        this.log(LogLevel.DEBUG, message, meta);
    }
}

export const logger = new Logger("API");


export const requestLogger = async (request: FastifyRequest): Promise<void> => {
    logger.info(`${request.method} ${request.url}`);
};

export const responseLogger = async (request: FastifyRequest, reply: FastifyReply) => {
    logger.info(`${request.method} ${request.url} ${reply.statusCode} ${reply.elapsedTime.toFixed(2)}ms`);
}
