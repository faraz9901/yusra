export class BaseService {
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