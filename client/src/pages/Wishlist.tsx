import { useMutation, useQuery } from '@apollo/client';
import {REMOVE_GAME} from '../utils/mutations';
import { GET_ME } from '../utils/queries';
import type { Game } from '../models/Game';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import type { User } from '../models/User';
import Auth from '../utils/auth';

const Wishlist = () => {
    const {loading, data, error, refetch} = useQuery(GET_ME);
    const [removeGame] = useMutation(REMOVE_GAME);

    if (loading) {
        return <h2>LOADING...</h2>;
    }

    if (error) {
        console.error(error);
    }

    const userData: User = data?.me || {};

    const addToWishlist = () => {
    };

    const addToPlayingList = () => {
    };

    const addToCompletedList = () => {
    };

    const handleDeleteGame = async (gameId: string) => {

      const gameToRemove = userData.savedGames?.find((game: Game) => game._id === gameId);

      if (!gameToRemove) {
        return false;
      }

      const token = Auth.loggedIn() ? Auth.getToken() : null;

      if (!token) {
        return false;
      }
  
      try {
        const { data } = await removeGame({
          variables: { gameId },
        });

      } catch (err) {
        console.error(err);
      }
      
      refetch();
    }

    return (
        <>
          <div className="text-light bg-dark p-5">
            <Container
            style={{
              display: "flex",
              justifyContent: "center",
            }}>
              <h1>Viewing {userData.username}'s Wishlist!</h1>
            </Container>
          </div>
          <Container>
            <h2 className='pt-5'>
              {userData.savedGames?.length
                ? `Viewing ${userData.savedGames.length} wishlisted ${userData.savedGames.length === 1 ? 'game' : 'games'
                }:`
                : 'You have no games on your wishlist!'}
            </h2>
            <div>
              <Row>
                {userData.savedGames?.map((game: Game) => {
                  return (
                    <Col md="4">
                      <Card key={game._id} component="div">
                        {game.image ? (
                          <img
                            src={game.image}
                            alt={`The cover for ${game.title}`}
                            className="card-img-top"
                          />
                        ) : null}
                        <CardContent>
                          <Typography variant="h5" component="div">{game.title}</Typography>
                          <p className="small">Released: {game.released}</p>
                          <Typography>{game.parent_platforms.map(platform => platform.platform.name).join(', ')}</Typography>
                          <Button
                            className="btn-block btn-danger"
                            onClick={() => handleDeleteGame(game._id)}
                          >
                            Delete this game!
                          </Button>
                        </CardContent>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </Container>
        </>
      );
}


export default Wishlist;