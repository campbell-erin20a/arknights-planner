
import { strict as assert } from 'assert';

import paginate, { Connection, Edge } from './paginate';
import translate from './i18n';


export const Query = {
  operator: (_, { id }, { db, user }) => db.Operator.findByPk(id, { user_id: user.id }),
  operators: (_, args, { db, user }) => paginate(db.Operator.findAll({ user_id: user.id })),
};

const createMutation = (key) =>
  async (_, { id, value }, { db, user }) => {
    assert(id != null, `Attempted to set Operator.${key} without specifying an ID.`);
    assert(value != null, `Attempted to set Operator.${key} to null.`);

    const [ owned ] = await db.OwnedOperator.findOrBuild({
      where: { [db.op.and]: {
        user_id: user.id,
        operator_id: id,
      } },
    });
    owned[key] = value;

    return owned.save();
  };
export const Mutation = {
  setOperatorOwned: createMutation('owned'),
  setOperatorElite: createMutation('elite'),
  setOperatorLevel: createMutation('level'),
  setOperatorSkill: createMutation('skill'),
  setOperatorTrust: createMutation('trust'),
  setOperatorPotential: createMutation('potential'),
};


export const Operator = {
  id: (operator) => operator.id,
  game_id: (operator) => operator.game_id,
  global: (operator) => operator.global,

  stars: (operator) => operator.stars,
  kind: (operator) => operator.kind,

  name_i18n: (operator) => operator.name_i18n,
  name: translate('name_i18n'),

  owned: (operator) => operator.Users?.[0]?.OwnedOperator?.owned,
  elite: (operator) => operator.Users?.[0]?.OwnedOperator?.elite,
  level: (operator) => operator.Users?.[0]?.OwnedOperator?.level,
  skill: (operator) => operator.Users?.[0]?.OwnedOperator?.skill,
  trust: (operator) => operator.Users?.[0]?.OwnedOperator?.trust,
  potential: (operator) => operator.Users?.[0]?.OwnedOperator?.potential,
};

export const OperatorConnection = Connection;
export const OperatorEdge = Edge;
