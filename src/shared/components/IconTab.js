
import PropTypes from 'prop-types';

import { css } from '@emotion/react';
import { Tab } from '@material-ui/core';


export default function IconTab({ children, ...props }) {
  return (
    <Tab { ...props }
      icon={children}
      css={css `
        &.MuiTab-root {
          min-width: 48px;
        }
      `} />
  );
}
IconTab.propTypes = {
  children: PropTypes.node,
};
