import { gql } from "graphql-tag";

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    password: String
    gameCount: Int
    savedGames: [Game]
  }


  type Platform {
  name: String
}

type ParentPlatforms {
  _id: ID!
  platform: Platform
}

type Game {
  _id: ID!
  title: String!
  released: String
  parent_platforms: [ParentPlatforms!]!
  floatRating: Float
  image: String
}


  type Auth {
    token: ID!
    user: User
  }

  input GameInput {
    _id: ID!
    title: String!
    released: String
    parent_platforms: [String]
    floatRating: Float
    image: String
  }

  type Query {
    me: User
    getAllGames: [Game!]!
    # getGame(_id: ID!): Game
    getGame(title: String!): Game
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveGame(gameData: GameInput!): User
    removeGame(_id: ID!): User
  }
`;

export default typeDefs;
