import { useMutation, useQuery } from '@apollo/client';
//import {REMOVE_GAME} from '../utils/mutations';
import { GET_ME } from '../utils/queries';
import AppNavbar from '../components/Navbar';

const Completed = () => {
    /*const {loading, data} = useQuery(GET_ME);
    const userData: User = data?.me || {};*/

    /*const handleDeleteGame = async (gameId: string) => {

    }*/

    /*if (loading) {
        return <h2>LOADING...</h2>;
    }*/

    return (
        <>
            <AppNavbar />
            <h1>completed</h1>
        </>
    );
}

export default Completed