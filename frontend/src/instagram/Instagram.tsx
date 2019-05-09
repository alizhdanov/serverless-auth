import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import styled from 'styled-components';

import { InstagramQuery } from '../../generated/graphql';
import { ReactComponent as LogoIcon } from './like.svg';
import { ReactComponent as ChatIcon } from './chat.svg';

const List = styled.ul`
  background-color: #282c34;
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: grid;
  padding: 2em 4em;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-gap: 1em;
  justify-items: center;
  align-items: center;
`;

const ListItem = styled.li`
  width: 100%;
  padding: 1em;
  background-color: #fff;
`;

const Img = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;

const Extra = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ExtraLocation = styled.div`
  margin-right: auto;
`;

const ExtraItem = styled.div`
  padding: 0.25em;

  svg {
    position: relative;
    bottom: -1px;
  }
`;

const Instagram: React.FC = () => {
  return (
    <Query<InstagramQuery>
      query={gql`
        query Instagram {
          instagram {
            id
            likes
            comments
            images {
              lowResolution {
                width
                height
                url
              }
            }
            location {
              name
            }
          }
        }
      `}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error:(</p>;

        if (!data) {
          return null;
        }

        return (
          <List>
            {data.instagram.map(item => (
              <ListItem key={item.id}>
                {/* TODO: set lazy attr */}
                <Img src={item.images.lowResolution.url} alt="" />
                <Extra>
                  <ExtraLocation>
                    {item.location && item.location.name}
                  </ExtraLocation>
                  <ExtraItem>
                    <LogoIcon width="14" height="14" /> {item.likes}
                  </ExtraItem>
                  <ExtraItem>
                    <ChatIcon width="14" height="14" /> {item.comments}
                  </ExtraItem>
                </Extra>
              </ListItem>
            ))}
          </List>
        );
      }}
    </Query>
  );
};

export default Instagram;
