import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import LoginForm from './components/LoginForm';

import SearchBar from './components/searchBar';
import SignUpForm from './components/SignupForm';


const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

import Navbar from './components/Navbar';

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <LoginForm handleModalClose={function (): void {
        throw new Error('Function not implemented.');
      } } />
      {/* <SearchBar /> */}
      {/* <Outlet /> */}
      {/* <SignUpForm handleModalClose={function (): void {
        throw new Error('Function not implemented.');
      } } /> */}

    </ApolloProvider>
  );
}

export default App;
