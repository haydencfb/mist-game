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
import type { User } from '../models/User';
import { GET_ME } from '../utils/queries';

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

  // Lazy query for searching games
  const [searchGames, { loading, data, error }] = useLazyQuery(GET_GAMES, {
    variables: {
      title: searchInput
    },
    onCompleted: (data) => {
      // console.log(data);
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
    // console.log("Loading...");
  }
  if (data) {
    // console.log(data);
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
    console.log("Saving game with ID: ", gameId);
    const gameToSave: Game | undefined = searchedGames.find((game) => game._id === gameId);

    if (!gameToSave) {
      console.error("Game not found in searchedGames");
      return;
    }

    const token = Auth.loggedIn() ? Auth.getToken() : null;
    console.log("User token:", token);

    if (!token) {
      console.log("No token found.", error);
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
    console.log("Sanitized gameData:", sanitizedGameData);

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
    console.log("Added to wishlist");
    handleSaveGame(game1._id);
  };

  // Function to add a game to the playing list
  const addToPlayingList = () => {
    console.log("Added to playing list");
  };

  // Function to add a game to the completed list
  const addToCompletedList = () => {
    console.log("Added to completed list");
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
              button2={addToPlayingList}
              button3={addToCompletedList}
            />
          )}
        </Stack>
      </Box>

      {/* <Container>
        <h2 className="pt-5">
          {searchedGames.length
            ? `Viewing ${searchedGames.length} results:`
            : "Search for a game to begin"}
        </h2>
        <Row>
          {loading && <p>Loading...</p>}
          {error && <p>Error fetching data!</p>}
          {searchedGames.map((game) => (
            <Col md="4" key={game.gameId}>
              <Card border="dark">
                {game.image && (
                  <Card.Img
                    
                    src={game.image}
                    alt={`The cover for ${game.title}`}
                    variant="top"
                  />
                )}
                <Card.Body>
                  <Card.Title>{game.title}</Card.Title>
                  <p className="small">Released: {game.released}</p>
                  <Card.Text>{game.floatRating}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedGameIds?.some(
                        (savedGameId: string) => savedGameId === game.gameId
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSaveGame(game.gameId)}
                    >
                      {savedGameIds?.some(
                        (savedGameId: string) => savedGameId === game.gameId
                      )
                        ? "This game has already been saved!"
                        : "Save this Game!"}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container> */}
    </>
  );
};

export default SearchGames;
