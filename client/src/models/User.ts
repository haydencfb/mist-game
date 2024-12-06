import type { Game } from './Game';

export interface User {
  username: string;
  email: string;
  password: string;
  savedGames: Game[];
}
