import type { APIRoute } from "astro";
import {createUser, getUserByEmail} from "../../../lib/user.ts";
import {Argon2id} from "oslo/password";

export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData();

    const email = formData.get("email")?.toString();
    let password = formData.get("password")?.toString();

    const firstName = formData.get("firstName")?.toString();
    const lastName = formData.get("lastName")?.toString();

    let missingFields = [];

    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");
    if (!firstName) missingFields.push("firstName");
    if (!lastName) missingFields.push("lastName");

    if (missingFields.length > 0) {
        return new Response(
            JSON.stringify({
                error: `Missing required fields: ${missingFields.join(', ')}s`
            }), {
                status: 400,
            });
    }

    const checkUser = await getUserByEmail(email);

    if (checkUser) {
        return new Response(
            JSON.stringify({
                error: `User ${email} already exists`
            }), {
                status: 400,
            });
    }

    try {
        password = await new Argon2id().hash(password);
        await createUser({ email, password, firstName, lastName})

        return redirect("/login?registered=true");
    } catch (error) {
        return new Response(
            JSON.stringify({
                error: "Error " + error.toString()
            }),
            {
                status: 500,
            });
    }
};
