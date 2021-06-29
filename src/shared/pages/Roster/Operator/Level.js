
import PropTypes from 'prop-types';
import { Types, getMaxLevel } from '@shared/utils/operator'

import Chip from './Chip';


export function Level({ stars, elite, level, onChange }) {
  const max = getMaxLevel(stars, elite);
  return <div>
    <div>Level:</div>
    <Chip selected={level} value={1} onChange={onChange}>1</Chip>
    { (elite === 2) && <>
      <Chip selected={level} value={20} onChange={onChange}>20</Chip>
      <Chip selected={level} value={60} onChange={onChange}>60</Chip>
    </> }
    <Chip selected={level} value={max} onChange={onChange}>{max}</Chip>
  </div>;
}
Level.propTypes = {
  stars: Types.stars.isRequired,
  elite: Types.elite.isRequired,
  level: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
