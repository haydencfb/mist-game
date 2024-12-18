import { Schema, model, type Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { gameSchema } from './Game.js';
import type { GameDocument } from './Game.js';

export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  savedGames: GameDocument[];
  isCorrectPassword(password: string): Promise<boolean>;
  gameCount: number;
}

export interface UserContext extends Document {
  user: {
    username: string | null;
    email: string | null;
    _id: string | null;
  }
}

const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    savedGames: [gameSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.virtual('gameCount').get(function (this: UserDocument) {
  return this.savedGames.length;
});

const User = model<UserDocument>('User', userSchema);

export default User;