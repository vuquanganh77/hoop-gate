
import { NextRequest, NextResponse } from "next/server";
import { signUp } from "@/model/users/users";
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const email = body.email;
        const phone_number = body.phone_number;
        const username = body.username;
        const password = body.password;

        // Validate input
        if (!email) {
            return NextResponse.json(
                { error: "Email is required." },
                { status: 400 }
            );
        }

        if (!username) {
            return NextResponse.json(
                { error: "username is required." },
                { status: 400 }
            );
        }

        if (!password) {
            return NextResponse.json(
                { error: "password is required." },
                { status: 400 }
            );
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const new_account = await signUp({ email, phone_number, username, hashedPassword });

        return NextResponse.json(
            {
                message: "Account created successfully.",
                user: { id: new_account.id, username: new_account.username, email: new_account.email },
            },
            { status: 201 }
        );


    } catch (erorr) {
        return NextResponse.json({ error: 'Failed to fetch sizes' }, { status: 500 });
    }
}