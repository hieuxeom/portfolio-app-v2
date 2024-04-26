import { query, queryOne, type IQueryOptions } from "@/helpers/database";
import { NextResponse } from "next/server";
import { decodeToken } from "../auth.utils";

export async function GET(request: Request) {
	const accessToken = request.headers.get("authorization")?.split(" ")[1];

	if (!accessToken || accessToken === "undefined") {
		return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
	}

	const { userId } = decodeToken(accessToken);

	if (!userId) {
		return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
	}

	const queryOptions: IQueryOptions = {
		sql: "SELECT * FROM users WHERE userId = ?",
		values: [userId],
	};

	const responseData = await queryOne(queryOptions);

	return NextResponse.json({ message: "success", userData: responseData }, { status: 200 });
}

export async function POST(request: Request) {}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}
