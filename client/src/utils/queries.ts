import { gql } from '@apollo/client';

export const GET_ME = gql`
    {
        me {
            _id
            username
            email
            savedGames {
                gameId
                title
                released
                parent_platforms
                floatRating
                image
            }
        }
    }
`;

export const GET_ALL_GAMES = gql`
    {
        getAllGames {
            gameId
            title
            released
            parent_platforms
            floatRating
            image
        }
    }
`;

export const GET_GAME = gql`
    query getGame($gameId: ID!) {
        getGame(gameId: $gameId) {
            gameId
            title
            released
            parent_platforms
            floatRating
            image
        }
    }
`;