import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { Container, Col, Form, Button, Card, Row } from 'react-bootstrap';
import Auth from '../utils/auth';
import { searchGoogleBooks } from '../utils/API';
import { saveGameIds, getSavedGameIds } from '../utils/localStorage';
import type { Game } from '../models/Game';
import type { RAWGAPIGame } from '../models/RAWGAPIGame';
import { useMutation } from '@apollo/client';
import { SAVE_GAME } from '../utils/mutations';
import GameCard from '../components/GameCard';
import { CardType } from '../components/GameCard';
import AppNavbar from '../components/Navbar';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const SearchGames = () => {
  // create state for holding returned google api data
  const [searchedGames, setSearchedGames] = useState<Game[]>([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved gameId values
  const [savedGameIds, setSavedGameIds] = useState(getSavedGameIds());

  const [saveGame] = useMutation(SAVE_GAME);

  // set up useEffect hook to save `savedGameIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveGameIds(savedGameIds);
  });

  // create method to search for games and set state on form submit
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchGoogleBooks(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const gameData = items.map((game: RAWGAPIGame) => ({
        gameId: game.id,
        title: game.volumeInfo.title,
        released: game.volumeInfo.released,
        parent_platforms: game.volumeInfo.parent_platforms,
        floatRating: game.volumeInfo.floatRating,
        image: game.volumeInfo.imageLinks?.thumbnail || '',
      }));

      setSearchedGames(gameData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a game to our database
  const handleSaveGame = async (gameId: string) => {
    // find the game in `searchedGames` state by the matching id
    const gameToSave: Game = searchedGames.find((game) => game.gameId === gameId)!;

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await saveGame({
        variables: { gameData: { ...gameToSave } }
      });

      // if game successfully saves to user's account, save game id to state
      setSavedGameIds([...savedGameIds, gameToSave.gameId]);
    } catch (err) {
      console.error(err);
    }
  };

  // Testing Functions
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
    parent_platforms: ["xbox", "ps3"],
    floatRating: 4.5,
    image: "/beach.jpg"
  }
  // Testing Functions End

  return (
    <>
      <AppNavbar />
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Games!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a game'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Box sx={{ width: '800px', margin: 'auto' }}>
        <Stack sx={{ pt: 2 }} spacing={2}>
          <GameCard game={game1} cardType={CardType.Search} button1={addToWishlist} button2={addToPlayingList} button3={addToCompletedList} />
          <GameCard game={game1} cardType={CardType.Wish} button1={addToWishlist} button2={addToPlayingList} button3={addToCompletedList} />
          <GameCard game={game1} cardType={CardType.Playing} button1={addToWishlist} button2={addToPlayingList} button3={addToCompletedList} />
          <GameCard game={game1} cardType={CardType.Completed} button1={addToWishlist} button2={addToPlayingList} button3={addToCompletedList} />
        </Stack>
      </Box>

      <Container>
        <h2 className='pt-5'>
          {searchedGames.length
            ? `Viewing ${searchedGames.length} results:`
            : 'Search for a game to begin'}
        </h2>
        <Row>
          {searchedGames.map((game) => {
            return (
              <Col md="4" key={game.gameId}>
                <Card border='dark'>
                  {game.image ? (
                    <Card.Img src={game.image} alt={`The cover for ${game.title}`} variant='top' />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{game.title}</Card.Title>
                    <p className='small'>Released: {game.released}</p>
                    <Card.Text>{game.floatRating}</Card.Text>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedGameIds?.some((savedGameId: string) => savedGameId === game.gameId)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveGame(game.gameId)}>
                        {savedGameIds?.some((savedGameId: string) => savedGameId === game.gameId)
                          ? 'This game has already been saved!'
                          : 'Save this Game!'}
                      </Button>
                    )}
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

export default SearchGames;