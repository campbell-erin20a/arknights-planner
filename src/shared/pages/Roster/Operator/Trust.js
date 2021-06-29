
import PropTypes from 'prop-types';
import { Types } from '@shared/utils/operator'

import Chip from './Chip';


export function Trust({ trust, onChange }) {
  return <div>
    <div>Trust:</div>
    <Chip selected={trust} value={0} onChange={onChange}>0%</Chip>
    <Chip selected={trust} value={100} onChange={onChange}>100%</Chip>
    <Chip selected={trust} value={200} onChange={onChange}>200%</Chip>
  </div>;
}
Trust.propTypes = {
  trust: Types.trust.isRequired,
  onChange: PropTypes.func.isRequired,
};
