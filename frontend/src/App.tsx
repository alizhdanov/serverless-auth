import React from 'react';
import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Query } from 'react-apollo';

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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h3>Wait for it!</h3>
          <p>This part under development.</p>
        </header>
        <Query<Data>
          query={gql`
            {
              test
            }
          `}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error:(</p>;

            return data && data.test;
          }}
        </Query>
      </div>
    </ApolloProvider>
  );
};

export default App;
