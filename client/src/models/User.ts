import type { Game } from './Game';

export interface User {
  // id: string;
  username: string;
  email: string;
  password: string;
  savedGames: Game[];
  // isCorrectPassword(password: string): Promise<boolean>;
  // gameCount: number;
}
