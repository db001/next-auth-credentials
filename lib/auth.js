import { hash, compare } from "bcryptjs";
import { promisify } from "util";
const randomBytesAsync = promisify(require("crypto").randomBytes);

export async function hashPassword(password) {
	const hashedPassword = await hash(password, 12);
	return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
	const isValid = await compare(password, hashedPassword);
	return isValid;
}

export async function createVerifyString() {
	const verify_string = await randomBytesAsync(32);
	return verify_string.toString("hex");
}
