
import PropTypes from 'prop-types';

import { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Card, Collapse, Divider as _Divider } from '@material-ui/core';

import { getTrustBreakpoint } from '@shared/utils/operator';

import Header from './Header';
import Elite from './Elite';
import Level from './Level';
import Skill from './Skill';
import Mastery from './Mastery';
import Trust from './Trust';
import Potential from './Potential';


const GET_OPERATOR = gql `
  query GetOperator($id: ID!) {
    operator(id: $id) {
      id

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
`;

const SET_OWNED = gql `
  mutation SetOperatorOwned($id: ID!, $value: Boolean!) {
    setOperatorOwned(id: $id, value: $value) {
      id
      owned
    }
  }
`;
const SET_ELITE = gql `
  mutation SetOperatorElite($id: ID!, $value: Int!) {
    setOperatorElite(id: $id, value: $value) {
      id
      elite
    }
  }
`


export const defaultWidth = '264px';

export const Spacer = styled.div `
  margin: ${({ theme: t }) => t.spacing(1)}px;
  width: ${defaultWidth};

  &:last-of-type {
    min-height: ${({ theme: t }) => t.spacing(8)}px;
  }
`;

export const Divider = styled(_Divider) `
  &.MuiDivider-root {
    margin-top: ${({ theme: t }) => t.spacing(1)}px;
    margin-bottom: ${({ theme: t }) => t.spacing(1)}px;
  }
`;

export default function RosterOperator({ id }) {
  const query = { query: GET_OPERATOR, variables: { id } };
  const { data, loading, error } = useQuery(query);

  const mutationOptions = { refetchQueries: [ query ] };
  const [ mutateOwned ] = useMutation(SET_OWNED, mutationOptions);
  const [ mutateElite ] = useMutation(SET_ELITE, mutationOptions);

  const [isOpen, setOpen] = useState(false);

  if( loading ) {
    return <div>Loading...</div>;
  }
  if( error ) {
    return <div>{id}: { error.toString() }</div>;
  }
  const {
    name,
    stars,
    skills,

    owned,
    elite,
    level,
    skill,
    trust,
    potential,
  } = data.operator;

  const setOwned = (value) => mutateOwned({
    variables: { id, value },
    optimisticResponse: {
      setOperatorOwned: { __typename: 'Operator', id, owned: value },
    },
  });
  const setElite = (value) => mutateElite({
    variables: { id, value },
    optimisticResponse: {
      setOperatorElite: { __typename: 'Operator', id, elite: value },
    },
  });

  return <Card component="li" css={(t) => css `
    width: ${defaultWidth};
    height: 100%;
    margin: ${t.spacing(1)}px;
  `}>
    <Header id={id} name={name}
      elite={elite} level={level} skills={skills}
      potential={potential} trust={trust}
      isOwned={owned} toggleOwned={() => setOwned(!owned)}
      isOpen={isOpen} toggleOpen={() => setOpen(!isOpen)} />
    <Collapse in={isOpen} timeout="auto" mountOnEnter unmountOnExit>
      <div css={(t) => css `padding: ${t.spacing(2)}px;`}>
        <Divider />
        <Elite stars={stars} elite={elite} onChange={setElite} />

        <Divider />
        <Level stars={stars} elite={elite} level={level} onChange={() => {}} />

        { (skills.length > 0) && <>
          <Divider />
          <Skill elite={elite} skill={skills[0].level} onChange={() => {}} />
        </> }

        { (skills.length > 0) && <>
          <Divider />
          { skills.map(({ mastery }, index) =>
            <Mastery key={`Mastery:${index}`}
              elite={elite} skill={skill} index={index + 1}
              level={mastery} onChange={() => {}} />
          ) }
        </> }

        <Divider />
        <Potential potential={potential} onChange={() => {}} />

        <Divider />
        <Trust trust={getTrustBreakpoint(trust)} onChange={() => {}} />
      </div>
    </Collapse>
  </Card>;
}
RosterOperator.propTypes = {
  id: PropTypes.string.isRequired,
};
