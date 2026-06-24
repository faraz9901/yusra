import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "../utils/timestamps";

export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),

    name: text("name").notNull(),

    email: text("email").notNull().unique(),

    passwordHash: text("password_hash").notNull(),

    ...timestamps
});