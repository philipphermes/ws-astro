import db from "../core/db.ts";
import {eq} from "drizzle-orm";
import {users} from "../../db/schema.ts";
import type {DatabaseUser} from "../interfaces/user.ts";

export async function getUserByEmail(email: string): Promise<DatabaseUser | undefined>{
    return db.query.users.findFirst({where: eq(users.email, email)});
}

export async function createUser(newUser: DatabaseUser) {
    await db.insert(users).values({
        email: newUser.email,
        password: newUser.password,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
    });
}
