import { ConnectionOptions } from "mysql2";
import mysql from "mysql2/promise";

export interface IQueryOptions {
	sql: string;
	values?: any[];
}

export async function query({ sql, values = [] }: IQueryOptions) {
	const connectOptions: ConnectionOptions = {
		host: process.env.MYSQL_HOST,
		port: Number(process.env.MYSQL_PORT) || 3000,
		database: process.env.MYSQL_DATABASE,
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PASSWORD,
	};

	const connectDb = await mysql.createConnection(connectOptions);

	try {
		const [results] = await connectDb.execute(sql, values);

		connectDb.end();
		return results;
	} catch (error) {
		console.log(error);
		return null;
	}
}
