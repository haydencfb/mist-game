import { gql } from "@apollo/client";

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      password
      savedGames {
        _id
        title
        released
        parent_platforms {
          _id
          platform {
            name
          }
        }
        floatRating
        image
      }
      gameCount
    }
  }
`;

export const GET_GAMES = gql`
  query getGames($searchTerm: String!) {
    getGames(searchTerm: $searchTerm) {
      gameId
      title
      released
      parent_platforms
      floatRating
      image
    }
  }
`;

// Query to fetch all games
export const GET_ALL_GAMES = gql`
  query GetAllGames {
    games {
      gameId
      title
      released
      parentPlatforms
      floatRating
      image
    }
  }
`;
// src/graphql/queries.js



export const SEARCH_GAMES = gql`
  query searchGames($query: String!) {
    searchGames(query: $query) {
      gameId
      title
      released
      parent_platforms
      floatRating
      image
    }
  }
`;
