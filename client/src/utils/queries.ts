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
  query getGames($title: String!) {
  getGame(title: $title) {
    _id
    title
    released
    parent_platforms {
      platform {
        name
      }
    }
    floatRating
    image
  }
}
`;

// Query to fetch all games
export const GET_ALL_GAMES = gql`
  query GET_ALL_GAMES {
    getAllGames {
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
  }
`;
