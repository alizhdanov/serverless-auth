import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Instagram from './instagram/Instagram';
import Github from './github/Github';

import './App.css';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URL,
});

interface Data {
  test: string;
}

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Github />
        <Instagram />
      </div>
    </ApolloProvider>
  );
};

export default App;
