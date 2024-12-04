import { Schema, type Document } from 'mongoose';

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
      platform: {
        name: String, 
      } 
    }
  ],
  floatRating: {
    type: Number,
  },
  image: {
    type: String,
  },
});

// const Game = model('game', gameSchema);

// export default Game;

export default { gameSchema };