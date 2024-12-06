import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import Auth from '../utils/auth';
import { removeGameId } from '../utils/localStorage';
import type { User } from '../models/User';
// import { Game } from '../models/Game';
import { useMutation, useQuery } from '@apollo/client';
import { REMOVE_GAME } from '../utils/mutations';
import { GET_ME } from '../utils/queries';

const SavedGames = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removeGame] = useMutation(REMOVE_GAME);
  const userData: User = data?.me || {};

  // create function that accepts the game's mongo _id value as param and deletes the game from the database
  const handleDeleteGame = async (gameId: string) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeGame({
        variables: { gameId },
      });

      removeGameId(gameId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className='text-light bg-dark p-5'>
        <Container>
          {userData.username ? (
            <h1>Viewing {userData.username}'s saved games!</h1>
          ) : (
            <h1>Viewing saved games!</h1>
          )}
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedGames.length
            ? `Viewing ${userData.savedGames.length} saved ${
                userData.savedGames.length === 1 ? 'game' : 'games'
              }:`
            : 'You have no saved games!'}
        </h2>
        <Row>
          {userData.savedGames.map((game) => {
            return (
              <Col md='4'>
                <Card key={game.gameId} border='dark'>
                  {game.image ? (
                    <Card.Img
                      src={game.image}
                      alt={`The cover for ${game.title}`}
                      variant='top'
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{game.title}</Card.Title>
                    <p className='small'>Released: {game.released}</p>
                    <Card.Text>{game.floatRating}</Card.Text>
                    <Button
                      className='btn-block btn-danger'
                      onClick={() => handleDeleteGame(game.gameId)}
                    >
                      Delete this Game!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedGames;
