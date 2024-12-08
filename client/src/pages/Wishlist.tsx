import { useMutation, useQuery } from '@apollo/client';
//import {REMOVE_GAME} from '../utils/mutations';
import { GET_ME } from '../utils/queries';
import AppNavbar from '../components/Navbar';
import type { Game } from '../models/Game';
import { Box } from '@mui/material';
import GameCard from '../components/GameCard';
import { CardType } from '../components/GameCard';
import { Stack } from '@mui/material';
import { Container } from '@mui/material';
import Card from '@mui/material/Card';

const Wishlist = () => {
    /*const {loading, data} = useQuery(GET_ME);
    const userData: User = data?.me || {};*/

    /*const handleDeleteGame = async (gameId: string) => {

    }*/

    /*if (loading) {
        return <h2>LOADING...</h2>;
    }*/

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
        _id: "1",
        title: "test",
        released: "2000",
        parent_platforms: ["xbox", "ps3"],
        floatRating: 4.5,
        image: "/beach.jpg"
    }

    return (
        <>
            <AppNavbar />
            <h1 className="display-1 py-2 px-3">WISHLIST</h1>
            <Card style={{ display: 'flex', margin: 'auto', backgroundColor: '#3f3d3d', width: '810px'}} >
                        <Box sx={{ width: '800px', margin: 'auto' }}>
                            <Stack sx={{ p: 4 }} spacing={2}>
                                <GameCard game={game1} cardType={CardType.Search} button1={addToWishlist} button2={addToPlayingList} button3={addToCompletedList} />
                                <GameCard game={game1} cardType={CardType.Wish} button1={addToWishlist} button2={addToPlayingList} button3={addToCompletedList} />
                                <GameCard game={game1} cardType={CardType.Playing} button1={addToWishlist} button2={addToPlayingList} button3={addToCompletedList} />
                                <GameCard game={game1} cardType={CardType.Completed} button1={addToWishlist} button2={addToPlayingList} button3={addToCompletedList} />
                            </Stack>
                        </Box>
            </Card>
        </>
    );
}


export default Wishlist