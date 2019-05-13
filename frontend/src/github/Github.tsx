import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import styled from 'styled-components';

import Heading from '../components/Heading';
import { GithubQuery } from '../../generated/graphql';

const Wrap = styled.div`
  padding: 2em 4em;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-gap: 1em;
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  padding: 1em;
`;

const NameLink = styled.a`
  display: block;
  font-weight: bold;
  color: black;
  text-decoration: underline;
  margin-bottom: 1em;
`;

const Description = styled.div`
  margin-bottom: 1em;
  border-radius: 4px;
`;

const Meta = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
`;

const Github = () => {
  return (
    <Wrap>
      <Heading align="center">Pinned on Github:</Heading>
      <Query<GithubQuery>
        query={gql`
          query Github {
            github {
              pinnedItems(first: 20, types: REPOSITORY) {
                nodes {
                  ... on Repository {
                    id
                    name
                    description
                    url
                    primaryLanguage {
                      name
                      color
                    }
                    stargazers {
                      totalCount
                    }
                  }
                }
              }
            }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error:(</p>;

          const nodes = data && data.github.pinnedItems.nodes;

          if (!nodes) {
            return null;
          }

          return (
            <List>
              {nodes.map(i =>
                i ? (
                  <ListItem key={i.id}>
                    <NameLink href={i.url} target="_blank">
                      {i.name}
                    </NameLink>
                    <Description>{i.description}</Description>
                    <Meta>
                      <div>{i.primaryLanguage && i.primaryLanguage.name}</div>
                      <div>
                        {(i.stargazers && i.stargazers.totalCount) || 0}
                      </div>
                    </Meta>
                  </ListItem>
                ) : null
              )}
            </List>
          );
        }}
      </Query>
    </Wrap>
  );
};

export default Github;
