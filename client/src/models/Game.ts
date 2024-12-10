import { ParentPlatforms } from './ParentPlatforms';

export interface Game {
  _id: string;
  title: string;
  released: string;
  parent_platforms: ParentPlatforms[];
  floatRating: number;
  image: string;
}
