import { MongoClient } from "mongodb";

export async function connectToDatabase() {
	const MONGO_USER = process.env.MONGO_USER;
	const MONGO_PASSWORD = process.env.MONGO_PWD;
	const MONGO_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@ideas.udkam.mongodb.net/nextauth?retryWrites=true&w=majority`;

	const client = await MongoClient.connect(MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	return client;
}
