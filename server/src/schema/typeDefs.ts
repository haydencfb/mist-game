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
  platform: Platform
}

type Game {
  _id: ID!
  title: String!
  released: String
  parent_platforms: [ParentPlatforms]
  floatRating: Float
  image: String
}


  type Auth {
    token: ID!
    user: User
  }

  input PlatformInput {
    name: String
  }

  input ParentPlatformsInput {
      platform: PlatformInput
  }

  input GameInput {
      title: String!
      released: String
      parent_platforms: [ParentPlatformsInput!]!
      floatRating: Float
      image: String
  }

  type Query {
    me: User
    getAllGames: [Game!]!
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
