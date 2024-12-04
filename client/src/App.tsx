import './App.css';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import LoginForm from './components/LoginForm';


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


    </ApolloProvider>
  );
}

export default App;
