import { expect, test, afterEach } from "bun:test";
import {createUser, getUserByEmail} from '../../../src/lib/user.ts'
import db from "../../../src/core/db.ts";
import {and, eq} from "drizzle-orm";
import {users} from "../../../db/schema.ts";

afterEach(async () => {
    await db.delete(users).where(and(eq(users.email, 'test@test.com')));
})

test("test user", async () => {
    const user = await getUserByEmail('test@test.com');

    expect(user).toBeUndefined();

    await createUser({
        email: 'test@test.com',
        password: 'test123',
        firstName: 'Unit',
        lastName: 'Test',
    });

    const existUser = await getUserByEmail('test@test.com');

    expect(existUser).not.toBeUndefined();
    expect(existUser?.email).toBe('test@test.com');
    expect(existUser?.firstName).toBe('Unit');
    expect(existUser?.lastName).toBe('Test');
})
