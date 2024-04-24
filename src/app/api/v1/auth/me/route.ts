import { query, type IQueryOptions } from "@/helpers/database";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const queryOptions: IQueryOptions = {
		sql: "SELECT * FROM users",
	};

	const responseData = await query(queryOptions);

	return NextResponse.json({ message: "success", data: responseData }, { status: 200 });
}

export async function POST(request: Request) {}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}
