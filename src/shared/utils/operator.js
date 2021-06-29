
import PropTypes from 'prop-types';
import UtilTypes from './prop-types';

import data from '../../../game-data/levels.json';


export function getMaxElite(stars) {
  for( let elite = 0; elite < data.length; ++elite ) {
    if( getMaxLevel(stars, elite) < 1 ) {
      return elite - 1;
    }
  }
  return data.length - 1;
}

export function getMaxLevel(stars, elite = 0) {
  return data[elite]?.max?.[stars - 1] ?? 0;
}

export function getMaxSkill(stars, elite) {
  if( stars > 2 ) {
    if( elite > 1 ) {
      return 7;
    } else {
      return 4;
    }
  } else {
    return 0;
  }
}

export function getTrustBreakpoint(trust) {
  return Math.floor(trust / 100) * 100;
}


const Types = {
  stars: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  elite: PropTypes.oneOf([0, 1, 2]),
  trust: PropTypes.number,
  potential: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
};

Types.skill = {};
Types.skill.level = PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7]);
Types.skill.shape = PropTypes.shape({ level: Types.skill.level.isRequired });

Types.mastery = {};
Types.mastery.index = PropTypes.oneOf([1, 2, 3]);
Types.mastery.level = PropTypes.oneOf([0, 1, 2, 3]);
Types.mastery.shape = PropTypes.shape({
  name: PropTypes.object.isRequired, // TODO: proper i18n_string type.
  level: Types.mastery.level.isRequired,
});

Types.skills = {};
Types.skills.levels = UtilTypes.tuple([
  Types.skill.level,
  Types.mastery.level,
  Types.mastery.level,
  Types.mastery.level,
]);
Types.skills.shapes = UtilTypes.tuple([
  Types.skill.shape,
  Types.mastery.shape,
  Types.mastery.shape,
  Types.mastery.shape,
]);

Types.operator = PropTypes.shape({
  id: PropTypes.string.isRequired,
  stars: Types.stars.isRequired,
  skills: Types.skills.shapes.isRequired,
  trust: Types.trust.isRequired,
  potential: Types.potential.isRequired,
});

export { Types };
