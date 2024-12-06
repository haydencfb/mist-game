import { signToken, AuthenticationError } from "../services/auth-service.js";
import { UserContext } from "../models/User.js";
import { UserDocument } from "../models/User.js";
import { GameDocument } from "../models/Game.js"; 
import User from "../models/User.js";
import Game from "../models/Game.js";

const resolvers = {
    Query: {
        me: async (_parent: any, _args: any, context: UserContext): Promise<UserDocument | null> => {

            try {
                if (context.user) {
                    const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
                    return userData;
                }
            } catch (err) {
                throw new AuthenticationError('Me Failed');
            }
            return null;

        },

        getAllGames: async (_parent: any, _args: any): Promise<GameDocument[] | null> => {
                
            try {
                const games = await Game.find({});
                return games;
            } catch (err) {
                throw new AuthenticationError('GetAllGames Failed');
            }

        },

        getGame: async (_parent: any, _args: any): Promise<GameDocument | null> => {

            try {
                const gameData = await Game.findOne({ _id: _args._id });
                if (!gameData) {
                    throw new AuthenticationError('Game not found');
                }
                return gameData;
            } catch (err) {
                throw new AuthenticationError('GetGame Failed');
            }
            return null;

        },
    },

    Mutation: {

        login: async (_parent: any, { email, password }: { email: string; password: string }): Promise<{ token: string; user: UserDocument }> => {  

                try {
                    const user = await User.findOne({ email });
                    if (!user || !(await user.isCorrectPassword(password))) {
                        throw new AuthenticationError('Invalid Credentials');
                    }

                    const token = signToken(user.username, user.password, user._id);
                    return { token, user };
                } catch (err) {
                    throw new AuthenticationError('Login failed');
                }

            },

        addUser: async (_parent: any, args: any): Promise<{ token: string; user: UserDocument }> => {
            try {
                const user = await User.create(args);
                if (!user) {
                    throw new Error('User creation failed');
                }
                const token = signToken(user.username, user.password, user._id);
                return { token, user };
            } catch (err) {
                throw new AuthenticationError('AddUser failed');
            }

        },

        saveGame: async (_parent: any, { gameData }: { gameData: GameDocument }, context: UserDocument): Promise<UserDocument | null> => {

            try {
                if (!context) {
                    throw new AuthenticationError('You need to be logged in!');
                }

                const updatedUser = await User.findByIdAndUpdate(
                    context._id,
                    { $addToSet: { savedGames: gameData } },
                    { new: true }
                );

                return updatedUser;
            } catch (err) {
                throw new AuthenticationError('SaveGame failed');
            }
            
        }, 

        removeGame: async (_parent: any, { gameId }: { gameId: GameDocument }, context: UserDocument): Promise<UserDocument | null> => {

            try {
                const updatedUser = await User.findByIdAndUpdate(
                    context._id,
                    { $pull: { savedGames: gameId } },
                    { new: true }
                );

                return updatedUser;
            } catch (err) {
                throw new AuthenticationError('RemoveGame failed');
            }

        }
    }
}

export default resolvers;