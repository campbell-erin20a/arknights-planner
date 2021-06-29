
import PropTypes from 'prop-types';

import { css } from '@emotion/react';
import { Chip as _Chip } from '@material-ui/core';


export default function Chip({ selected, value, disabled, children, onChange, ...props }) {
  const isSelected = !disabled && (selected === value);
  return <_Chip
    size="small"
    color={isSelected ? 'primary' : 'default'}
    label={<strong>{children}</strong>}
    css={(t) => css `
      min-width: ${t.spacing(6)}px;

      &.MuiButtonBase-root {
        margin: ${t.spacing(0.5)}px;
      }
    `}
    disabled={disabled}
    onClick={() => !isSelected && onChange(value)}
    {...props} />;
}
Chip.propTypes = {
  selected: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  onChange: PropTypes.func.isRequired,
};
