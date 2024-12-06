import { gql } from 'graphql-tag';

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String
        password: String
        gameCount: Int
        savedGames: [Game]
    }

    type Game {
        gameId: ID!
        developers: [String]
        description: String
        title: String!
        image: String
        tags: String
    }

    type Auth {
        token: ID!
        user: User
    }

    input GameInput {
        gameId: ID!
        developers: [String]
        description: String
        title: String!
        image: String
        tags: String
    }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveGame(gameData: GameInput!): User
        removeGame(gameId: ID!): User
    }
`

export default typeDefs;