
import PropTypes from 'prop-types';

import { css } from '@emotion/react';
import { Tab } from '@material-ui/core';


export default function LabelTab({ children, ...props }) {
  return (
    <Tab { ...props }
      label={children}
      css={css `
        &.MuiTab-root {
          min-width: 80px;
        }
      `} />
  );
}
LabelTab.propTypes = {
  children: PropTypes.node,
};
