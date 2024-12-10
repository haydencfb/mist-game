import { Schema, type Document, model } from 'mongoose';

export interface ParentPlatformsDocument {
  platform: { name: string };
}

export interface GameDocument extends Document {
  title: string;
  released: string;
  parent_platforms: [ParentPlatformsDocument];
  floatRating: number;
  image: string;
}

export interface GameInput extends Document {
  title: string;
  released: string;
  parent_platforms: [ParentPlatformsDocument];
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
  parent_platforms: {
    type: [
        {
            platform: {
                name: { type: String, required: true },
            },
        },
    ],
    validate: {
        validator: function (v: any) {
            return Array.isArray(v) && v.every((p: any) => p.platform?.name);
        },
        message: 'Each parent platform must have a valid name',
    },
  },
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