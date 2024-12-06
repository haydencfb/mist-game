import mongoose, { Schema, type Document, model } from 'mongoose';

export interface GameDocument extends Document {
  title: string;
  released: string;
  parent_platforms: string[];
  floatRating: number;
  image: string;
}

export interface GameInput extends Document {
  title: string;
  released: string;
  parent_platforms: string[];
  floatRating: number;
  image: string;
}

const gameSchema = new Schema<GameDocument>({
  title: {
    type: String,
  },
  released: {
    type: String,
  },
  parent_platforms: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      platform: {
        name: String,
      },
    },
  ],
  floatRating: {
    type: Number,
  },
  image: {
    type: String,
  },
});

const Game = model('game', gameSchema);

export { gameSchema };

export default Game;