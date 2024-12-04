import dotenv from "dotenv";
import connection from "./config/connection.js";
import fetch from "node-fetch";
import Game from "./models/Game.js";

dotenv.config();

// console.log(process.env.MONGODB_URI)

const games: {
  title: string;
  parent_platforms: string[];
  rating: number;
  image: string;
//   tags: string[];
}[] = [];

const fetchData = async () => {
    console.log('hit');
  const response = await fetch("https://api.rawg.io/api/games?key=NA")
    const data = await response.json();
      console.log(data);
      data.results.forEach((g: any) => {
        const nextGame = {
          title: g.name,
          parent_platforms: g.parent_platforms,
          rating: g.rating,
          image: g.background_image,
          tags: g.tags,
        };
        games.push(nextGame);
      });
};
connection.once("open", async () => {
  console.log("Connected to DB.");
  try {
    await fetchData();
    await Game.deleteMany({});
    await Game.insertMany(games as any);
    console.info("Seeding complete");
    process.exit(0);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("An unknown error occurred");
    }
  }
});
