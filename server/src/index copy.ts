import { readFileSync } from 'fs';
import path from 'path';
import type { Application } from 'express';
import gql from 'graphql-tag';
import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import resolvers from './resolvers';

const initApolloServer = (app: Application) => {
    const typeDefs = gql(
        readFileSync(path.resolve(__dirname, 'schema'), {
            encoding: 'utf-8'
        })
    );

    const apolloServer = new ApolloServer({
        schema: buildSubgraphSchema({ typeDefs, resolvers })
    });

    return apolloServer;
};

export { resolvers, initApolloServer };
