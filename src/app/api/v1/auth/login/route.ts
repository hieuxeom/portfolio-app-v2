import { query, type IQueryOptions } from "@/helpers/database";
import type { IUser } from "@/types/User";
import { NextResponse } from "next/server";
import { comparePassword, generateAccessToken, generateRefreshToken } from "../auth.utils";

export async function GET(request: Request) {
	return NextResponse.json({ status: "success", message: "Hello World" }, { status: 200 });
}

export async function POST(request: Request) {
	const { email, password } = await request.json();

	const queryOptions: IQueryOptions = {
		sql: `SELECT * FROM users WHERE email = ?`,
		values: [email],
	};

	const userData = await query(queryOptions);

	if (userData) {
		const { email, fullName, password: hashPassword } = userData[0] as IUser;

		if (await comparePassword(password, hashPassword)) {
			return NextResponse.json(
				{
					status: "success",
					message: "Login successfully",
					data: {
						email,
						fullName,
						accessToken: generateAccessToken(userData[0] as IUser),
						refreshToken: generateRefreshToken(userData[0] as IUser),
					},
				},
				{ status: 200 }
			);
		} else {
			return NextResponse.json({ status: "failure", message: "Wrong password" }, { status: 401 });
		}
	} else {
		return NextResponse.json({ status: "failure", message: `Cannot found user with email ${email}` }, { status: 400 });
	}
}
