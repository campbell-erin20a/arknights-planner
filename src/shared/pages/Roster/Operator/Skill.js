
import PropTypes from 'prop-types';
import { Types } from '@shared/utils/operator'

import Chip from './Chip';


export function Skill({ elite, skill = 1, onChange }) {
  return <div>
    <div>Skill Level:</div>
    <Chip selected={skill} value={1} onChange={onChange}>1</Chip>
    <Chip selected={skill} value={2} onChange={onChange}>2</Chip>
    <Chip selected={skill} value={3} onChange={onChange}>3</Chip>
    <Chip selected={skill} value={4} onChange={onChange}>4</Chip>
    <Chip selected={skill} value={5} disabled={elite < 1} onChange={onChange}>5</Chip>
    <Chip selected={skill} value={6} disabled={elite < 1} onChange={onChange}>6</Chip>
    <Chip selected={skill} value={7} disabled={elite < 1} onChange={onChange}>7</Chip>
  </div>;
}
Skill.propTypes = {
  elite: Types.elite.isRequired,
  skill: Types.skill.level,
  onChange: PropTypes.func.isRequired,
};
