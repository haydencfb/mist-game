import SearchBar from '../components/searchBar';
import GameCard from '../components/GameCard';

const HomePage = () => {
  return (
    <div>
        <SearchBar />
        {/* <GameCard game={undefined} cardType={"/Users/isaiahskidmore/Desktop/bootcamp-material/Mist/client/src/components/GameCard".Search} button1={function (): void {
              throw new Error('Function not implemented.');
          } } button2={function (): void {
              throw new Error('Function not implemented.');
          } } button3={function (): void {
              throw new Error('Function not implemented.');
          } } /> */}
          <GameCard />
    </div>
  );
};

export default HomePage;