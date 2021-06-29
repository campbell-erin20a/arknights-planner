

export const Operator = {
  upgrades: (operator, { available }) => operator.Upgrades, // TODO: available
};

export const Upgrade = {
  __resolveType: (upgrade) => {
    switch( upgrade.kind ) {
      case 'ELITE': return 'EliteUpgrade';
      case 'LEVEL': return 'MaterialUpgrade';
      case 'SKILL': return 'SkillUpgrade';
      case 'MASTERY': return 'MasteryUpgrade';
    }
    throw new Error(`Unknown ItemKind: "${upgrade.kind}"`);
  },

  id: (upgrade) => upgrade.id,
};

export const EliteUpgrade = {
  elite: (upgrade) => upgrade.elite,
  cost: (upgrade) => upgrade.cost,
};

export const LevelUpgrade = {
  elite: (upgrade) => upgrade.elite,
  level: (upgrade) => upgrade.level, // TODO ????
  cost: (upgrade, { from = 1 }) => new Error('TODO: Implement LevelUpgrade.cost'),
};

export const SkillUpgrade = {
  level: (upgrade) => upgrade.level,
  cost: (upgrade) => upgrade.cost,
};

export const MasteryUpgrade = {
  level: (upgrade) => upgrade.level,
  skill: (upgrade) => upgrade.skill,
  
};
