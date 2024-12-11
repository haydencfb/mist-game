// This page allows users to search for games and save them to their profile

// React Imports
import { useState } from "react";
import type { FormEvent } from "react";
import { useMutation, useLazyQuery } from "@apollo/client";
import "../App.css";

// Styling Imports
import { Container, Form } from "react-bootstrap";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

// Utils Imports
import Auth from "../utils/auth";
import { getSavedGameIds } from "../utils/localStorage";
import { SAVE_GAME } from "../utils/mutations";
import { GET_GAMES } from "../utils/queries";

// Model Imports
import type { Game } from "../models/Game";

// Component Imports
import GameCard from "../components/GameCard";
import { CardType } from "../components/GameCard";

const SearchGames = () => {
  const [searchedGames, setSearchedGames] = useState<Game[]>([]);

  // useState for the saved game IDs
  const [savedGameIds, setSavedGameIds] = useState(getSavedGameIds());

  const [saveGame] = useMutation(SAVE_GAME);

  // useState for the search input (User Input in the Search Form)
  const [searchInput, setSearchInput] = useState("");

  // useState for the visibility of the card
  const [isCardVisible, setIsCardVisible] = useState(false);

  const [game1, setGame1] = useState<Game>({
    _id: "",
    title: "",
    released: "",
    parent_platforms: [],
    floatRating: 0,
    image: "",
  });

  const sampleGame: Game = {
    _id: "1",
    title: "The Legend of Zelda: Breath of the Wild",
    released: "2017-03-03",
    parent_platforms: [
      {
        _id: 1,
        platform: {
          name: "Nintendo Switch",
        },
      },
    ],
    floatRating: 97,
    image: "../../public/zelda.webp"
  };

  const sampleGame2: Game = {
    _id: "2",
    title: "Grand Theft Auto V",
    released: "2013-09-17",
    parent_platforms: [
      {
        _id: 1,
        platform: {
          name: "PC",
        },
      },
      {
        _id: 2,
        platform: {
          name: "PlayStation",
        },
      },
      {
        _id: 3,
        platform: {
          name: "Xbox",
        },
      },
    ],
    floatRating: 4.9,
    image: "../../public/gta.png"
  };

  const sampleGame3: Game = {
    _id: "3",
    title: "Counter-Strike: Global Offensive",
    released: "2012-08-21",
    parent_platforms: [
      {
        _id: 1,
        platform: {
          name: "PC",
        },
      },
    ],
    floatRating: 4.5,
    image: "../../public/csgo.jpg"
  };


  // Lazy query for searching games
  const [searchGames, { loading, data, error }] = useLazyQuery(GET_GAMES, {
    variables: {
      title: searchInput
    },
    onCompleted: (data) => {
      if (data && data.getGame) {
        const games = Array.isArray(data.getGame) ? data.getGame : [data.getGame];
        setSearchedGames(games);
        setGame1(games[0] || game1); // Set the first game or default
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });

  if (loading) {
  }
  if (data) {
  }
  if (error) {
    console.error(error);
  }

  // Function to handle the form submission for searching games
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (searchInput.trim() === "") {
      return;
    }

    try {
      await searchGames();
      setIsCardVisible(true);
    } catch (err) {
      console.error(err);
    }
  };

  // Function to save a game
  const handleSaveGame = async (gameId: string) => {
    const gameToSave: Game | undefined = searchedGames.find((game) => game._id === gameId);

    if (!gameToSave) {
      console.error("Game not found in searchedGames");
      return;
    }

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    // Sanitize the game data to match the GameInput structure
    const sanitizedGameData = {
      title: gameToSave.title,
      released: gameToSave.released,
      parent_platforms: gameToSave.parent_platforms.map((platform) => ({
        platform: { name: platform.platform.name },
      })), // Ensure this matches the GameInput type
      floatRating: gameToSave.floatRating,
      image: gameToSave.image,
    };

    try {
      await saveGame({
        variables: { gameData: sanitizedGameData },
      });

      setSavedGameIds([...savedGameIds, gameToSave._id]);
      savedGameIds.push(gameToSave._id);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  // Function to add a game to the wishlist
  const addToWishlist = () => {
    handleSaveGame(game1._id);
  };

  const profile = Auth.getProfile() as { data: { username: string } };
  const username = profile.data.username;

  return (
    <>
      <div className="text-light bg-dark p-5">
            <Container
            style={{
              display: "flex",
              justifyContent: "center",
            }}>
              <h1>Hello {username}!</h1>
            </Container>
          </div>
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "25px",
          paddingBottom: "35px",
        }}
      >
        <Paper
          sx={{
            p: "4px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: 60,
            maxWidth: 700,
            borderRadius: 6,
            backgroundColor: "#3f3d3d",
          }}
        >
          <Paper
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              height: 40,
              maxWidth: 675,
              borderRadius: 3,
              backgroundColor: "white",
            }}
          >
            <Form onSubmit={handleFormSubmit} style={{ display: "flex", width: "100%" }}>
              <InputBase
                name="searchInput"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type="text"
                placeholder="Search for a game"
                sx={{
                  flex: 1, // Use flex to make the input take available space
                  ml: 1,
                  "&:focus": {
                    outline: "none",
                  },
                }}
              />
              <IconButton
                type="submit"
                onClick={() => searchGames({ variables: { title: searchInput } })}
                sx={{
                  p: "10px",
                  borderRadius: 3,
                  backgroundColor: "#8B363E",
                  color: "white",
                  height: 30,
                  "&:hover": {
                    backgroundColor: "#a5424d",
                  },
                }}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </Form>
          </Paper>
        </Paper>
      </Container>

      <Box sx={{ width: "45%", minWidth:500, margin: "auto" }}>
        <Stack sx={{ pt: 2 }} spacing={2}>
          {isCardVisible && (
            <GameCard
              game={game1}
              cardType={CardType.Search}
              button1={addToWishlist}
            />
          )}
        </Stack>
      </Box>

      <Container
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "25px",
              paddingBottom: "35px",
            }}>
              <h1>Today's Biggest Hits!</h1>
            </Container>

      <Box sx={{ width: "45%", minWidth:500, margin: "auto" }}>
        <Stack sx={{ pt: 2 }} spacing={2}>
            <GameCard
              game={sampleGame}
              cardType={CardType.Search}
              button1={addToWishlist}
            />
        </Stack>
      </Box>

      <Box sx={{ width: "45%", minWidth:500, margin: "auto" }}>
        <Stack sx={{ pt: 2 }} spacing={2}>
            <GameCard
              game={sampleGame2}
              cardType={CardType.Search}
              button1={addToWishlist}
            />
        </Stack>
      </Box>

      <Box sx={{ width: "45%", minWidth:500, margin: "auto" }}>
        <Stack sx={{ pt: 2 }} spacing={2}>
            <GameCard
              game={sampleGame3}
              cardType={CardType.Search}
              button1={addToWishlist}
            />
        </Stack>
      </Box>
    </>
  );
};

export default SearchGames;
