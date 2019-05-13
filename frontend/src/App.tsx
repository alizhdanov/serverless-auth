import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Instagram from './instagram/Instagram';

import logo from './logo.svg';
import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:4444',
});

interface Data {
  test: string;
}

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Instagram />
      </div>
    </ApolloProvider>
  );
};

export default App;
