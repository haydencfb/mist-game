import { Schema, type Document, model } from 'mongoose';

export interface GameDocument extends Document {
  gameId: string;
  title: string;
  developers: string[];
  description: string;
  image: string;
  tags: string;
}

export interface GameInput extends Document {
  gameId: string;
  developers: string[];
  description: string;
  title: string;
  image: string;
  tags: string;
}

const gameSchema = new Schema<GameDocument>({
  developers: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  
  gameId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  tags: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
});

const Game = model('game', gameSchema);

export default { Game, gameSchema };