import { ApiError } from "@yusra/shared/core";
import { hash, verify } from "argon2";
import { eq } from "drizzle-orm";
import { BaseService } from "../../core/base.service";
import { users } from "../../db/schemas/user.table";

class AuthService extends BaseService {
    async login(email: string, password: string) {
        const [user] = await this.db.select().from(users).where(eq(users.email, email)).limit(1)

        if (!user) {
            throw new ApiError("NOT_FOUND", 404, "User not found");
        }

        const isValid = await verify(user.passwordHash, password);

        if (!isValid) {
            throw new ApiError("UNAUTHORIZED", 401, "Invalid credentials");
        }


        return user;
    }

    async register(email: string, password: string, name: string) {
        const [existingUser] = await this.db.select().from(users)

        if (existingUser) {
            throw new ApiError("FORBIDDEN", 403, "A user already exists! Please login.");
        }

        const passwordHash = await hash(password);

        const [user] = await this.db
            .insert(users)
            .values({
                email,
                name,
                passwordHash,
            })
            .returning();

        return user;
    }

    async getMe(userId: string) {
        const [user] = await this.db.select().from(users).where(eq(users.id, userId)).limit(1)

        if (!user) {
            throw new ApiError("NOT_FOUND", 404, "User not found");
        }

        return user;
    }

    async logout() {
        return true;
    }
}


export const authService = new AuthService();