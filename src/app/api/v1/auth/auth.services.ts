import type { IUser } from "@/types/User";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export const comparePassword = async (inputPassword: string, hashPassword: string): Promise<boolean> => {
	console.log(await bcrypt.compare(inputPassword, hashPassword));
	return await bcrypt.compare(inputPassword, hashPassword);
};

export const generateAccessToken = (userData: IUser): string => {
	const { userId, role } = userData;

	const payload = {
		userId,
		role,
	};

	return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: 1000 * 60 * 60 });
};

export const generateRefreshToken = (userData: IUser): string => {
	const { userId } = userData;

	const payload = {
		userId,
	};

	return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: 1000 * 60 * 60 * 24 });
};

export const decodeToken = (token: string) => {
	return jwt.verify(token, process.env.JWT_SECRET_KEY);
};
