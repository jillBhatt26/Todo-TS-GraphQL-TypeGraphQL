import { readFileSync } from 'fs';
import path from 'path';
import 'colors';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSubgraphSchema } from '@apollo/subgraph';
import cors from 'cors';
import express, { Application } from 'express';
import gql from 'graphql-tag';
import { FE_URL, NODE_ENV, PORT } from '@config';
import { connectDB } from '@db';

const app: Application = express();

connectDB()
    .then(async conn => {
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        app.use(
            cors({
                origin: FE_URL,
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
                allowedHeaders: ['Content-Type'],
                credentials: true
            })
        );

        const typeDefs = gql(
            readFileSync(path.resolve(__dirname, 'schema', 'index.graphql'), {
                encoding: 'utf-8'
            })
        );

        const server = new ApolloServer({
            schema: buildSubgraphSchema({ typeDefs, resolvers: {} }),
            introspection: NODE_ENV !== 'production'
        });

        startStandaloneServer(server, { listen: { port: PORT } });

        console.log(
            `MongoDB connected on: ${conn.connection.host}...✅`.blue.underline
                .bold
        );

        console.log(
            `🚀🚀🚀...Server listening on port: ${PORT}...🚀🚀🚀`.white
                .underline.bold
        );
    })
    .catch(error => {
        console.log(
            `MongoDB connection error: ${error.message}...✅`.red.underline.bold
        );

        process.exit(1);
    });
