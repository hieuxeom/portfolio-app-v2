import { query, type IQueryOptions } from "@/helpers/database";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { decodeToken, generateAccessToken } from "../auth.services";
import type { IUser } from "@/types/User";

export async function GET(request: Request) {
	const refreshToken = cookies().get("refresh_token")?.value;

	if (refreshToken) {
		const decode = decodeToken(refreshToken);
		const { userId } = decode;
		const queryOptions: IQueryOptions = {
			sql: "SELECT * FROM users WHERE userId = ?",
			values: [userId],
		};

		const userData = await query(queryOptions);

		if (userData) {
			return NextResponse.json({ status: "success", accessToken: generateAccessToken(userData[0] as IUser) }, { status: 200 });
		} else {
			return NextResponse.json({ status: "error" }, { status: 404 });
		}
	}

	return NextResponse.json({ message: "success" }, { status: 200 });
}

export async function POST(request: Request) {}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}
