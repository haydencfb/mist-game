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