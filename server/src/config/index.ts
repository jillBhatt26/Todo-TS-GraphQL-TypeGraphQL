import 'dotenv/config';

const NODE_ENV: string = process.env.NODE_ENV ?? 'development';
const PORT: number = parseInt(process.env.PORT!) || 5000;
const FE_URL: string = process.env.FE_URL ?? 'http://localhost:3000';
const DB_URL: string =
    process.env.DB_URL ?? 'mongodb://localhost:27017/MERN-GQL-TS';

export { NODE_ENV, PORT, FE_URL, DB_URL };
