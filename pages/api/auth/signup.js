import { hashPassword, createVerifyString } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";
import User from "../../../models/User";

async function handler(req, res) {
	if (req.method !== "POST") {
		return;
	}

	const data = req.body;
	const { email, password } = data;

	if (!email || !email.includes("@") || !password) {
		res.status(422).json({
			message: "Invalid input - password should also be at least 7 characters long.",
		});
		return;
	}

	const client = await connectToDatabase();
	const db = client.db();
	const existingUser = await db.collection("users").findOne({ email: email });

	if (existingUser) {
		res.status(422).json({ message: "User exists already!" });
		client.close();
		return;
	}

	const hashedPassword = await hashPassword(password);
	const verify_string = await createVerifyString();

	const newUser = new User({
		email: email,
		password: hashedPassword,
		verify_string,
	});

	const result = await db.collection("users").insertOne(newUser);

	res.status(201).json({ message: "Created user!", user: newUser });
	client.close();
}

export default handler;
