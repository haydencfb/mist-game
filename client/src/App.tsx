import { Outlet } from 'react-router-dom';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Auth from "./utils/auth";

const httpLink = createHttpLink({
  uri: "/graphql", // Replace with your GraphQL API endpoint
});

const authLink = setContext((_, { headers }) => {
  const token = Auth.getToken();
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "", // Include token in Authorization header
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
