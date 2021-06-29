
import PropTypes from 'prop-types';
import { Types } from '@shared/utils/operator'

import Chip from './Chip';


export default function Elite({ stars, elite, onChange }) {
  return <div>
    <div>Elite:</div>
    <Chip selected={elite} value={0} onChange={onChange}>E0</Chip>
    { (stars >= 3) &&
      <Chip selected={elite} value={1} onChange={onChange}>E1</Chip> }
    { (stars >= 4) &&
      <Chip selected={elite} value={2} onChange={onChange}>E2</Chip> }
  </div>;
}
Elite.propTypes = {
  stars: Types.stars.isRequired,
  elite: Types.elite.isRequired,
  onChange: PropTypes.func.isRequired,
};
