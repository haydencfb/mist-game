import { Schema, type Document, model } from 'mongoose';

export interface GameDocument extends Document {
  title: string;
  parent_platforms: string[];
  rating: number;
  image: string;
  // tags: string[];
}

export interface GameInput extends Document {
  parent_platforms: string[];
  rating: number;
  title: string;
  image: string;
  // tags: string[];
}

const gameSchema = new Schema<GameDocument>({
  parent_platforms: [{ 
    platform: {
    //  id: Number, 
      name: String, 
      // slug: String 
    } 
  }],
  rating: {
    type: Number,
  },
  image: {
    type: String,
  },
//   tags:[ {
//     type: String,
//   },
// ],
  title: {
    type: String,
  },
});

const Game = model('game', gameSchema);

export default Game;