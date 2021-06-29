
import PropTypes from 'prop-types';
import { useState } from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { color } from '@material-ui/system';
import { Button as _Button, OutlinedInput } from '@material-ui/core';
import {
  Done as ConfirmIcon,
  Close as CancelIcon,
  Backspace as BackspaceIcon,
} from '@material-ui/icons';


export function Button({ value, onClick, ...props }) {
  return (
    <_Button
      variant="outlined"
      size="small"
      color="default"
      fullWidth
      css={css `&.MuiButton-root { min-width: 0; }`}
      onClick={value
        ? () => onClick(Number.parseInt(value))
        : onClick}
      {...props} />
  );
}
Button.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  onClick: PropTypes.func.isRequired,
};

export const Cell = styled.div `
  ${color}
  width: 25%;
  padding: ${({ theme: t }) => t.spacing(0.5)}px;
`;

export default function Numpad({
  value,
  format = (value) => value,
  onCancel,
  onConfirm: _onConfirm,
}) {
  const [{ first, state }, setState] = useState({
    first: true,
    state: String(value),
  });

  const onClick = (digit) => first
    ? setState({ first: false, state: digit })
    : setState({ first: false, state: `${state}${digit}` });
  const onBackspace = () => setState({
    first: false,
    state: state.slice(0, -1),
  });
  const onConfirm = () => _onConfirm(Number.parseInt(state));

  return (
    <div css={css `display: flex; flex-wrap: wrap; justify-content: center;`}>
      <div css={css `width: 75%;`}>
        <OutlinedInput
          value={format(state)}
          type="text"
          readOnly
          fullWidth
          inputProps={{ inputMode: 'numeric' }}
          margin="dense"
          css={css `& input { text-align: right; }`} />
      </div>
      <Cell color="success.main">
        <Button onClick={onConfirm} color="inherit"><ConfirmIcon/></Button>
      </Cell>

      <Cell><Button value="1" onClick={onClick}><b>1</b></Button></Cell>
      <Cell><Button value="2" onClick={onClick}><b>2</b></Button></Cell>
      <Cell><Button value="3" onClick={onClick}><b>3</b></Button></Cell>
      <Cell color="error.main">
        <Button onClick={onCancel} color="inherit"><CancelIcon/></Button>
      </Cell>

      <Cell><Button value="4" onClick={onClick}><b>4</b></Button></Cell>
      <Cell><Button value="5" onClick={onClick}><b>5</b></Button></Cell>
      <Cell><Button value="6" onClick={onClick}><b>6</b></Button></Cell>
      <Cell><Button value="0" onClick={onClick}><b>0</b></Button></Cell>

      <Cell><Button value="7" onClick={onClick}><b>7</b></Button></Cell>
      <Cell><Button value="8" onClick={onClick}><b>8</b></Button></Cell>
      <Cell><Button value="9" onClick={onClick}><b>9</b></Button></Cell>
      <Cell><Button variant="text" onClick={onBackspace}><BackspaceIcon/></Button></Cell>
    </div>
  );
}
Numpad.propTypes = {
  value: PropTypes.number.isRequired,
  format: PropTypes.func,

  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
