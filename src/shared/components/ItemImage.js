
import PropTypes from 'prop-types';

import { css } from '@emotion/react';


const flexCenter = css `
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export default function ItemImage({ id, tier, name, width = 144 }) {
  return <span css={ css `width: ${width}px; height: calc(${width}px / 1.43); ${flexCenter}` } title={name}>
    <span css={ css `position: relative; transform: scale(calc(${width} / (1.43 * 183))); ${flexCenter}` }>
      <img css={ css `position: absolute;` } src={ `/images/tier/${tier}.png` } alt={ `Tier ${tier}` } />
      <img css={ css `position: absolute;` } src={ `/images/items/${id}.png` }  alt={ name } />
    </span>
  </span>;
}
ItemImage.propTypes = {
  id: PropTypes.string.isRequired,
  tier: PropTypes.oneOf([1, 2, 3, 4, 5]).isRequired,
  name: PropTypes.string.isRequired,

  width: PropTypes.number,
};
