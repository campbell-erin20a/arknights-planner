
import PropTypes from 'prop-types';
import { useState } from 'react';

import { useQuery, useMutation, gql } from '@apollo/client';

import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Card, Badge, ButtonGroup, Button, TextField, Collapse } from '@material-ui/core';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Dialpad as DialpadIcon,
} from '@material-ui/icons';

import Numpad from '@shared/components/Numpad';
import ItemImage from '@shared/components/ItemImage';


const GET_ITEM = gql `
  query GetItem($id: ID!) {
    item(id: $id) {
      id
      tier
      name
      scale
      owned
    }
  }
`;

const UPDATE_OWNED = gql `
  mutation UpdateItemOwned($id: ID!, $value: Int, $offset: Int) {
    updateItemOwned(id: $id, value: $value, offset: $offset) {
      id
      owned
    }
  }
`;


export const defaultWidth = '172px';

export const Spacer = styled.div `
  margin: ${({ theme: t }) => t.spacing(1)}px;
  width: ${defaultWidth};

  &:last-of-type {
    min-height: ${({ theme: t }) => t.spacing(8)}px;
  }
`;

export const SCALES = [
  [ 1_000_000, 1_000, 'm', {
    useGrouping: true,
    minimumIntegerDigits: 1,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  } ],
  [     1_000, 1_000, 'k', {
    useGrouping: true,
    minimumIntegerDigits: 1,
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  } ],
  [         1,     1, '', {
    useGrouping: true,
    minimumIntegerDigits: 1,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  } ],
];
export const getScale = (useScale, value) => {
  for( const [ scale, count, suffix, options ] of SCALES ) {
    const scaled = value/scale;
    if( scale !== 1 ) {
      if( !useScale || (scaled < 0.5) ) {
        continue;
      }
    }

    const nf = new Intl.NumberFormat('en-US', options);
    const format = nf.format.bind(nf);

    return [count, format, format(scaled), suffix];
  }
}

export default function DepotItem({ id, onscreenNumpad = false }) {
  const { data, loading, error } = useQuery(GET_ITEM, { variables: { id } }); // TODO: Theoretically can not be loading or error state due to prefetching?
  const [ update ] = useMutation(UPDATE_OWNED, {
    refetchQueries: [{ query: GET_ITEM, variables: { id } }],
  });

  const [ isOpen, setOpen ] = useState(false);
  const [ value, setValue ] = useState(null);

  if( loading ) {
    return <div>{id}: Loading...</div>;
  }
  if( error ) {
    return <div>{id}: { error.toString() }</div>;
  }
  const { item } = data;

  const set = (value) => update({
    variables: { id, value },
    optimisticResponse: {
      updateItemOwned: { __typename: 'Item', id, owned: value },
    },
  });
  const offset = (offset) => update({
    variables: { id, offset },
    optimisticResponse: {
      updateItemOwned: { __typename: 'Item', id, owned: item.owned + offset },
    },
  });

  const [ count, format, scaled, suffix ] = getScale(item.scale, item.owned);
  const increment = () => offset(count);
  const decrement = () => offset(-count);


  const onOpen = () => setOpen(!isOpen);
  const onConfirm = (value) => {
    set(value);
    setOpen(false);
  };
  const onCancel = () => setOpen(false);

  const onChange = (event) =>
    setValue(event?.target?.value ?? 0);
  const onBlur = (event) => (event?.target?.value != null) &&
    set(Number.parseInt(event.target.value));

  return (
    <Card component="li" css={(t) => css `
      margin: ${t.spacing(1)}px;
      padding: ${t.spacing(1)}px;
      display: flex;
      flex-direction: column;
      align-items: center;

      width: ${defaultWidth};
      height: 100%;
    `}>
      <Badge
        color="primary"
        showZero
        max={Infinity}
        overlap="circle"
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        css={(t) => css `
          & .MuiBadge-badge {
            height: 24px;
            min-width: 24px;
            padding: 0 8px;
            border-radius: 12px;
            font-size: 0.8125rem;
            background-color: ${t.palette.grey[900]};
          }

          & .MuiBadge-anchorOriginTopRightCircle {
            top: 0;
            right: 9%;

            transform: unset;
            transform-origin: unset;
          }
        `}
        badgeContent={`${scaled}${suffix}`}
      >
        <ItemImage id={id} tier={item.tier} name={item.name} />
      </Badge>
      <ButtonGroup
        variant="contained"
        color="default"
        size="small"
        css={(t) => css `
          margin-top: -24px;
          background-color: ${t.palette.grey[900]};
          z-index: 1;

          & > .MuiButtonGroup-grouped {
            min-width: 0;
          }
        `}
      >
        <Button onClick={decrement}><RemoveIcon /></Button>
        { onscreenNumpad &&
          <Button onClick={onOpen}><DialpadIcon /></Button> }
        <Button onClick={increment}><AddIcon /></Button>
      </ButtonGroup>
      { onscreenNumpad
        ? <Collapse
            in={isOpen}
            timeout="auto"
            mountOnEnter
            unmountOnExit
            css={(t) => css `
              & .MuiCollapse-wrapperInner {
                margin-top: ${t.spacing(1)}px;
              }
            `}
          >
            <Numpad
              value={item.owned}
              format={format}
              onConfirm={onConfirm}
              onCancel={onCancel} />
          </Collapse>
        : <TextField
            id={`${id}-TextField`}
            value={format(value ?? item.owned)}
            onChange={onChange}
            onBlur={onBlur}
            variant="outlined"
            size="small"
            inputProps={{
              type: 'text',
              inputMode: 'numeric',
            }}
            css={(t) => css `
              &.MuiFormControl-root {
                margin: ${t.spacing(1, 0, 0)}
              }
              & .MuiInputBase-input {
                text-align: right;
              }
            `} /> }
    </Card>
  );
}
DepotItem.propTypes = {
  id: PropTypes.string.isRequired,
  onscreenNumpad: PropTypes.bool,
};
