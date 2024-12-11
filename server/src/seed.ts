import dotenv from "dotenv";
import connection from "./config/connection.js";
import fetch from "node-fetch";
import Game from "./models/Game.js";

dotenv.config();
const apiKey = process.env.RAWGAPI_KEY;

const games: {
  title: string;
  released: string;
  parent_platforms: string[];
  floatRating: number;
  image: string;
}[] = [];

const fetchData = async () => {
    const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}`);
    const data = await response.json();
      data.results.forEach((g: any) => {
        const nextGame = {
          title: g.name,
          released: g.released,
          parent_platforms: g.parent_platforms,
          floatRating: g.rating,
          image: g.background_image,
        };
        games.push(nextGame);
      });
};
connection.once("open", async () => {
  try {
    await fetchData();
    await Game.deleteMany({});
    await Game.insertMany(games as any);
    console.info("Seeding complete");
    process.exit(0);
  } catch (error) {
    if (error instanceof Error) {
    } else {
    }
  }
});