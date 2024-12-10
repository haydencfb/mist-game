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

        getAllGames: async () => {

            try {
                const games = await Game.find();
                // games.forEach(game => console.log("Parent Platforms:", game.parent_platforms));
                return games;
            } catch (err) {
                throw new AuthenticationError("GetAllGames Failed");
            }
            
        },

        getGame: async (_parent: any, _args: { title: string }): Promise<GameDocument | null> => {

            try {
                const gameData = await Game.findOne({ title: _args.title });
                if (!gameData) {
                    throw new AuthenticationError('Game not found');
                }
                return gameData;
            } catch (err) {
                throw new AuthenticationError('GetGame Failed');
            }

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

        saveGame: async (_parent: any, { gameData }: { gameData: GameDocument }, context: UserContext): Promise<UserDocument | null> => {
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in!');
            }
        
            // Transform gameData to match the schema
            const transformedGameData = {
                ...gameData,
                parent_platforms: gameData.parent_platforms.map((platform: any) => ({
                    platform: {
                        name: platform.platform.name,
                    },
                })),
            };
        
            try {
                const updatedUser = await User.findByIdAndUpdate(
                    context.user._id,
                    { $push: { savedGames: transformedGameData } },
                    { new: true, runValidators: true }
                );
        
                return updatedUser;
            } catch (err: any) {
                console.error(err.message);
                throw new Error('Failed to save game');
            }
        },

        removeGame: async (_parent: any, { gameId }: { gameId: string }, context: UserContext): Promise<UserDocument | null> => {
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in!');
            }
        
            try {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedGames: { _id: gameId } } },
                    { new: true }
                );
        
                if (!updatedUser) {
                    throw new Error('User not found');
                }
        
                return updatedUser;
            } catch (err: any) {
                console.error('Error in removeGame resolver:', err.message);
                throw new Error('Failed to remove game');
            }
        }
    }
}

export default resolvers;