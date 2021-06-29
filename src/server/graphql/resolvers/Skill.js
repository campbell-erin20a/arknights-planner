
import { strict as assert } from 'assert';

import translate from './i18n';


export const Operator = {
  skills: (operator) => {
    const skills = {};
    for( const skill of operator.Skills ) {
      skills[skill.id] = skill;
    }
    for( const skill of operator.Users?.[0]?.OwnedOperator?.Skills ) {
      skills[skill.id].OwnedOperatorSkill = skill.OwnedOperatorSkill;
    }
    return Object.values(skills);
  },
};

export const Mutation = {
  setSkillMastery: async (_, { operator_id, skill_id, value }, { db, user }) => {
    assert(skill_id != null, 'Attempted to set Skill.mastery without specifying an ID.');
    assert(operator_id != null, 'Attempted to set Skill.mastery without specifying an operator_id.');
    assert(value != null, 'Attempted to set Skill.mastery to null');

    const [ ownedOperator ] = await db.OwnedOperator.findOrCreate({
      attributes: [ 'id' ],
      where: { [db.op.and]: {
        user_id: user.id,
        operator_id,
      } },
    });

    const [ owned ] = await db.OwnedOperatorSkill.findOrBuild({
      include: [ {
        model: db.OwnedOperatorSkill,
        where: {
          owned_operator_id: ownedOperator.id,
          skill_id,
        },
      } ],
    });
    owned.skills[0].mastery = value;

    return owned.save();
  },
};


export const Skill = {
  id: (skill) => skill.id,

  name_i18n: (skill) => skill.name_i18n,
  name: translate('name_i18n'),

  recovery: (skill) => skill.recovery,
  activation: (skill) => skill.activation,

  level: (skill, { level = 10 }) => skill.SkillLevels.find((l) => l.level === level ),
  levels: (skill) => skill.SkillLevels,

  mastery: (skill) => skill.OwnedOperatorSkill?.level,
};

export const SkillLevel = {
  skill: (level) => level.Skill,
  level: (level) => level.level,

  sp: (level) => level.sp,
  initial: (level) => level.initial,

  text_i18n: (level) => level.text_i18n,
  text: translate('text_i18n'),
};
