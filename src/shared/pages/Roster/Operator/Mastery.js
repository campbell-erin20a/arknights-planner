
import PropTypes from 'prop-types';
import { Types } from '@shared/utils/operator'

import Chip from './Chip';


export function Mastery({ index, elite, skill, level = 0, onChange }) {
  return <div>
    <div>Skill {index}:</div>
    <Chip selected={level} value={0} disabled={(elite < 2) || (skill < 7)} onChange={onChange}>M0</Chip>
    <Chip selected={level} value={1} disabled={(elite < 2) || (skill < 7)} onChange={onChange}>M1</Chip>
    <Chip selected={level} value={2} disabled={(elite < 2) || (skill < 7)} onChange={onChange}>M2</Chip>
    <Chip selected={level} value={3} disabled={(elite < 2) || (skill < 7)} onChange={onChange}>M3</Chip>
  </div>;
}
Mastery.propTypes = {
  elite: Types.elite.isRequired,
  skill: Types.skill.level.isRequired,
  index: Types.mastery.index.isRequired,
  level: Types.mastery.level,
  onChange: PropTypes.func.isRequired,
};
