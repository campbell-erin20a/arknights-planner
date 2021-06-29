
import PropTypes from 'prop-types';
import { Types } from '@shared/utils/operator'

import Chip from './Chip';


export function Potential({ potential, onChange }) {
  return <div>
    <div>Potential:</div>
    <Chip selected={potential} value={1} onChange={onChange}>P1</Chip>
    <Chip selected={potential} value={2} onChange={onChange}>P2</Chip>
    <Chip selected={potential} value={3} onChange={onChange}>P3</Chip>
    <Chip selected={potential} value={4} onChange={onChange}>P4</Chip>
    <Chip selected={potential} value={5} onChange={onChange}>P5</Chip>
    <Chip selected={potential} value={6} onChange={onChange}>P6</Chip>
  </div>;
}
Potential.propTypes = {
  potential: Types.potential.isRequired,
  onChange: PropTypes.func.isRequired,
};
