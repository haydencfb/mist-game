import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Auth from './utils/auth'; // Assuming this has methods to get the token.

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = Auth.loggedIn() ? Auth.getToken() : null; // Check if user is logged in and get the token.
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '', // Attach the token to the headers.
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink), // Combine the auth link with the HTTP link.
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <main>
        <Outlet />
      </main>
    </ApolloProvider>
  );
}

export default App;
