import { z } from "zod";

export type InferBody<T extends z.ZodType> = z.infer<T>;


export const dateSchema = z.preprocess((value) => {
    if (value instanceof Date) {
        return value;
    }

    if (typeof value === "string") {
        return new Date(value);
    }

    return value;
}, z.date());