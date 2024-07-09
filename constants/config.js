import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;

export { MONGO_URI, PORT, SECRET_KEY };
