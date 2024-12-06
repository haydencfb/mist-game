import { gql } from '@apollo/client';

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

export const GET_ALL_GAMES = gql`
    {
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

export const GET_GAME = gql`
    query GET_GAME($title: String!) {
        getGame(title: $title) {
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