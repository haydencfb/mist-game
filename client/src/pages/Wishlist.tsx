import { useMutation, useQuery } from '@apollo/client';
import {REMOVE_GAME} from '../utils/mutations';
import { GET_ME } from '../utils/queries';
import AppNavbar from '../components/Navbar';
import type { Game } from '../models/Game';
import { Box } from '@mui/material';
import GameCard from '../components/GameCard';
import { CardType } from '../components/GameCard';
import { Stack } from '@mui/material';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import type { User } from '../models/User';
import Auth from '../utils/auth';

const Wishlist = () => {
    const {loading, data} = useQuery(GET_ME);
    const [removeGame] = useMutation(REMOVE_GAME);

    /*const handleDeleteGame = async (gameId: string) => {

    }*/

    /*if (loading) {
        return <h2>LOADING...</h2>;
    }*/
    const userData: User = data?.me || {};

    const addToWishlist = () => {
        console.log('Added to wishlist');
    };

    const addToPlayingList = () => {
        console.log('Added to playing list');
    };

    const addToCompletedList = () => {
        console.log('Added to completed list');
    };

    const game1: Game = {
        gameId: "1",
        title: "test",
        released: "2000",
        parent_platforms: [],
        floatRating: 4.5,
        image: "/beach.jpg"
    }

    const handleDeleteGame = async (gameId: string) => {
        // get token
        const token = Auth.loggedIn() ? Auth.getToken() : null;
    
        if (!token) {
          return false;
        }
    
        try {
          await removeGame({
            variables: { gameId },
          });
    
          // upon success, you can add any additional logic here
        } catch (err) {
          console.error(err);
        }

    // return (
    //     <>
    //         <AppNavbar />
    //         <h1 className="display-1 py-2 px-3">WISHLIST</h1>
    //         <Card style={{ display: 'flex', margin: 'auto', backgroundColor: '#3f3d3d', width: '810px'}} >
    //                     <Box sx={{ width: '800px', margin: 'auto' }}>
    //                         <Stack sx={{ p: 4 }} spacing={2}>
    //                             <GameCard game={game1} cardType={CardType.Search} button1={addToWishlist} button2={addToPlayingList} button3={addToCompletedList} />
    //                             <GameCard game={game1} cardType={CardType.Wish} button1={addToWishlist} button2={addToPlayingList} button3={addToCompletedList} />
    //                             <GameCard game={game1} cardType={CardType.Playing} button1={addToWishlist} button2={addToPlayingList} button3={addToCompletedList} />
    //                             <GameCard game={game1} cardType={CardType.Completed} button1={addToWishlist} button2={addToPlayingList} button3={addToCompletedList} />
    //                         </Stack>
    //                     </Box>
    //         </Card>
    //     </>
    // );
    }

    return (
        <>
          <div className="text-light bg-dark p-5">
            <Container>
              {/* <h1>Viewing {userData.username}'s books!</h1> */}
            </Container>
          </div>
          <Container>
            <h2 className='pt-5'>
              {userData.savedGames?.length
                ? `Viewing ${userData.savedGames.length} saved ${userData.savedGames.length === 1 ? 'book' : 'books'
                }:`
                : 'You have no saved books!'}
            </h2>
            <div>
              <Row>
                {userData.savedGames?.map((game: Game) => {
                  return (
                    <Col md="4">
                      <Card key={game.gameId} component="div">
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
                          <Typography>No description available</Typography>
                          <Button
                            className="btn-block btn-danger"
                            onClick={() => handleDeleteGame(game.gameId)}
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


export default Wishlist