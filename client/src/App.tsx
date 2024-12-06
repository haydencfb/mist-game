
import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import LoginForm from './components/LoginForm';


const client = new ApolloClient({
   uri: '/graphql',
   cache: new InMemoryCache(),
 });

 import Navbar from './components/Navbar';
import SearchBooks from './pages/SearchBooks';


function App() {
  return (
    <ApolloProvider client={client}>
      {/* <LoginForm handleModalClose={function (): void {
        throw new Error('Function not implemented.');
      } } /> */}
      <Outlet />


    </ApolloProvider>
  );
}

    export default App;
