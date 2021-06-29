
import { useQuery, gql } from '@apollo/client';

import { css } from '@emotion/react';

import Operator, { Spacer } from './Operator';


const GET_OPERATORS = gql `
  query GetOperators {
    operators {
      edges {
        node {
          id
          global

          name
          stars
          kind
          skills {
            id
            name
            mastery
          }

          owned
          elite
          level
          skill
          trust
          potential
        }
      }
    }
  }
`;

export default function Roster() {
  // Want some kind of filters
  // Simplest are owned and text search of name
  // Others: Class, Rarity, Server

  const { loading, error, data } = useQuery(GET_OPERATORS);

  if( loading ) {
    return <div>Loading...</div>;
  }
  if( error ) {
    return <div>{ error.toString() }</div>;
  }

  const operators = data.operators.edges
    .map(({ node }) => node)
    .sort((a, b) => (a.name >= b.name) ? (a.name > b.name) ? 1 : 0 : -1);

  return <ul css={css `
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  `}>
    { operators.map((id) => <Operator key={id} id={id} />) }
    { [0, 1, 2, 3].map((key) => <Spacer key={key} />) }
  </ul>;
}
