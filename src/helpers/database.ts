import { ConnectionOptions } from "mysql2";
import mysql, { type RowDataPacket } from "mysql2/promise";

export interface IQueryOptions {
	sql: string;
	values?: any[];
}

type ProjectEnv = "development" | "production" | "test";

const getConnectionOptions = (env: ProjectEnv): ConnectionOptions => {
	if (env === "production") {
		return {
			host: process.env.MYSQL_HOST,
			port: Number(process.env.MYSQL_PORT) || 3000,
			database: process.env.MYSQL_DATABASE,
			user: process.env.MYSQL_USER,
			password: process.env.MYSQL_PASSWORD,
		};
	} else {
		return {
			host: process.env.MYSQL_HOST_DEV,
			port: Number(process.env.MYSQL_PORT_DEV) || 3000,
			database: process.env.MYSQL_DATABASE_DEV,
			user: process.env.MYSQL_USER_DEV,
			password: process.env.MYSQL_PASSWORD_DEV,
		};
	}
};

export async function query({ sql, values = [] }: IQueryOptions): Promise<RowDataPacket[]> {
	const connectOptions: ConnectionOptions = getConnectionOptions(process.env.NODE_ENV);

	const connectDb = await mysql.createConnection(connectOptions);

	try {
		const [results] = await connectDb.query<RowDataPacket[]>(sql, values);

		connectDb.end();
		return results;
	} catch (error) {
		console.log(error);
		return [];
	}
}

export async function queryMany({ sql, values = [] }: IQueryOptions): Promise<RowDataPacket[][]> {
	const connectOptions: ConnectionOptions = getConnectionOptions(process.env.NODE_ENV);

	const connectDb = await mysql.createConnection({ ...connectOptions, multipleStatements: true });

	try {
		const [results] = await connectDb.query<RowDataPacket[][]>(sql, values);

		connectDb.end();
		return results;
	} catch (error) {
		console.log(error);
		return [];
	}
}

export async function queryOne({ sql, values = [] }: IQueryOptions): Promise<RowDataPacket> {
	const connectOptions: ConnectionOptions = getConnectionOptions(process.env.NODE_ENV);

	const connectDb = await mysql.createConnection(connectOptions);

	try {
		const [results] = await connectDb.execute(sql, values);

		connectDb.end();
		return (results as RowDataPacket[])[0];
	} catch (error) {
		console.log(error);
		return {} as RowDataPacket;
	}
}
