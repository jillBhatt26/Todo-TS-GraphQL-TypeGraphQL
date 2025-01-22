import express, { Application } from 'express';
import cors from 'cors';
import 'colors';
import { FE_URL, PORT } from '@config';
import { connectDB } from '@db';

const app: Application = express();

connectDB()
    .then(conn => {
        app.use(
            cors({
                origin: FE_URL,
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
                allowedHeaders: ['Content-Type'],
                credentials: true
            })
        );

        app.listen(PORT, () => {
            console.log(
                `MongoDB connected on: ${conn.connection.host}...✅`.blue
                    .underline.bold
            );
            console.log(
                `🚀🚀🚀...Server listening on port: ${PORT}...🚀🚀🚀`.white
                    .underline.bold
            );
        });
    })
    .catch(error => {
        console.log(
            `MongoDB connection error: ${error.message}...✅`.red.underline.bold
        );

        process.exit(1);
    });
