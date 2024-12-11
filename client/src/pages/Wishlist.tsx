import { useMutation, useQuery } from "@apollo/client";
import { REMOVE_GAME } from "../utils/mutations";
import { GET_ME } from "../utils/queries";
import type { Game } from "../models/Game";
import { Container, Row, Col, Button } from "react-bootstrap";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import type { User } from "../models/User";
import Auth from "../utils/auth";
import AppNavbar from '../components/Navbar';

const Wishlist = () => {
  const { loading, data, error, refetch } = useQuery(GET_ME);
  const [removeGame] = useMutation(REMOVE_GAME);

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  if (error) {
    console.error(error);
  }

  const userData: User = data?.me || {};

  const addToWishlist = () => {
    console.log("Added to wishlist");
  };

  const addToPlayingList = () => {
    console.log("Added to playing list");
  };

  const addToCompletedList = () => {
    console.log("Added to completed list");
  };

  const handleDeleteGame = async (gameId: string) => {
    console.log("Removing game with ID: ", gameId);

    const gameToRemove = userData.savedGames?.find(
      (game: Game) => game._id === gameId
    );
    console.log("Game to remove:", gameToRemove);

    if (!gameToRemove) {
      console.log("Game not found in saved games.");
      return false;
    }

    const token = Auth.loggedIn() ? Auth.getToken() : null;
    console.log("User Token:", token);

    if (!token) {
      console.log("No token found.");
      return false;
    }

    try {
      const { data } = await removeGame({
        variables: { gameId },
      });

      console.log("Game removed from wishlist:", data);
    } catch (err) {
      console.error(err);
    }

    refetch();
  };

  return (
    <>
      <AppNavbar />
      <div className="text-light bg-dark p-5">
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <h1>Viewing {userData.username}'s Wishlist!</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData.savedGames?.length
            ? `Viewing ${userData.savedGames.length} wishlisted ${
                userData.savedGames.length === 1 ? "game" : "games"
              }:`
            : "You have no games on your wishlist!"}
        </h2>
<div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {userData.savedGames?.map((game: Game) => (
            <Card key={game._id} style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#49191E",
              color: "#FFFFFF",
              borderRadius: 20,
              padding: '10px',
            }}>
              <CardMedia
                component="img"
                style={{ height: 225, maxHeight: 600, maxWidth: 250, objectFit: 'cover', borderRadius: 20 }}
                image={game.image}
                alt="Game cover"
              />
              <Box style={{ display: "flex", flexDirection: "column", flex: 1, marginLeft: '20px' }}>
                <CardContent style={{ flex: "1 0 auto" }}>
                  <Typography variant="h5" component="div">{game.title}</Typography>
                  <p className="small">Released: {game.released}</p>
                  <Typography>{game.parent_platforms.map(platform => platform.platform.name).join(', ')}</Typography>
                </CardContent>
              </Box>
              
              <PlaylistRemoveIcon 
              onClick={() => handleDeleteGame(game._id)}
              style={{ alignSelf: 'center', 
              marginLeft: '20px', 
              cursor: 'pointer',
              fontSize: '4rem'
             }}
              />
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Wishlist;
