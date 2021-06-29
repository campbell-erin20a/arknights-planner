
import { useQuery, gql } from '@apollo/client';

import { css } from '@emotion/react';
import { useMediaQuery } from '@material-ui/core';

import Item, { Spacer } from './Item';


export const GET_ITEMS = gql `
  query GetItems {
    items {
      edges {
        node {
          id
          tier
          name
          owned

          sort
          scale
          visible
        }
      }
    }
  }
`;


export default function Depot() {
  const isLarge = useMediaQuery((t) => t.breakpoints.up('md'));
  const { loading, error, data } = useQuery(GET_ITEMS);

  if( loading ) {
    return <div>Loading...</div>;
  }
  if( error ) {
    return <div>{ error.toString() }</div>;
  }

  const items = data.items.edges
    .map(({ node }) => node)
    .filter(({ visible }) => visible)
    .sort((a, b) => a.sort - b.sort);

  return <ul css={ css `
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  `}>
    { items.map(({ id }) => <Item key={id} id={id} onscreenNumpad={!isLarge} />) }
    { [0,1,2,3,4,5,6,7].map((key) => <Spacer key={key} />) }
  </ul>;
}

// See if I can get uhhhhhh, things to align super nicely based on breakpoints
// Rather than just the `good enough` that it is right now at desktop and my mobile sizes.
