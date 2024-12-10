import { gql } from "@apollo/client";

export const GET_ME = gql`
  query GET_ME {
    me {
      _id
      username
      email
      savedGames {
        _id
        title
        floatRating
        image
        released
        parent_platforms {
          platform {
            name
          }
        }
      }
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
