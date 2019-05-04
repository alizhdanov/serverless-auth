import React from 'react';
import ApolloClient, { gql } from 'apollo-boost';
import logo from './logo.svg';
import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:4444',
});

client
  .query({
    query: gql`
      {
        test
      }
    `,
  })
  .then(result => console.log(result));

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>Wait for it!</h3>
        <p>This part under development.</p>
      </header>
    </div>
  );
};

export default App;
