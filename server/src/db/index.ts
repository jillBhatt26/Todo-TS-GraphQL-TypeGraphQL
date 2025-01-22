import { connect, Mongoose, MongooseError } from 'mongoose';
import { DB_URL } from '@config';

const connectDB = () =>
    new Promise<Mongoose>(async (resolve, reject) => {
        try {
            const conn = await connect(DB_URL);

            resolve(conn);
        } catch (error: unknown) {
            if (error instanceof MongooseError) {
                reject(error.message ?? 'Failed to connect to MongoDB!');
            }

            reject('Cannot fetch MongoDB connection details!');
        }
    });

export { connectDB };
