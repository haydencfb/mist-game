import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }   
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_GAME = gql`
    mutation saveGame($gameData: GameInput!) {
        saveGame(gameData: $gameData) {
            _id
            username
            email
            savedGames {
                _id
                title
                released
                floatRating
                image
                parent_platforms {
                    platform {
                    name
                    }
                }
            }
        }
    }
`;

export const REMOVE_GAME = gql`
    mutation removeGame($id: ID!) {
        removeGame(_id: $id) {
            _id
            username
            email
            savedGames {
                _id
                title
                released
                floatRating
                image
                parent_platforms {
                    platform {
                        name
                    }
                }
            }
        }
    }
`;

