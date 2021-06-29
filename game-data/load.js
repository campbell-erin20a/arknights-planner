#!/usr/bin/env node
/* eslint-env node */
(async function() {


const fs = require('fs/promises');









const KIND_ORDER = {
  ELITE: 0,
  SKILL: 1,
  MASTERY: 2,
  LEVEL: 3,
};
const compare = (a, b) => {
  if( a.kind !== b.kind ) {
    return KIND_ORDER[a.kind] - KIND_ORDER[b.kind];
  }
  if( a.elite !== b.elite ) {
    return a.elite - b.elite;
  }
  if( a.skill_id !== b.skill_id ) {
    return a.skill_id - b.skill_id;
  }
  if( a.level !== b.level ) {
    return a.level - b.level;
  }

  const ids = []
    .concat(Object.keys(a.cost ?? {}))
    .concat(Object.keys(b.cost ?? {}))
    .sort();
  for( const id of ids ) {
    if( a.cost[id] !== b.cost[id] ) {
      return a.cost[id] - b.cost[id];
    }
  }

  return 0;
};


let skill_id = 0;
const skill_ids = new Map();
const skills = new Map();
const get_skill = (skill) => {
  const key = skill.name['zh-CN'];
  if( !skill_ids.has(key) ) {
    skill.id = skill_id++;
    skill_ids.set(key, skill.id);
    skills.set(skill.id, skill);
  }
  return skill_ids.get(key);
}

let upgrade_id = 0;
const upgrade_ids = new Map();
const upgrades = new Map();
const get_upgrade = (upgrade) => {
  for( const key of upgrade_ids.keys() ) {
    if( compare(key, upgrade) === 0 ) {
      return upgrade_ids.get(key);
    }
  }

  upgrade.id = upgrade_id++;
  upgrade_ids.set(upgrade, upgrade.id);
  upgrades.set(upgrade.id, upgrade);

  return upgrade.id;
};

for( const operator of r.op ) {
  const skills = [];
  for( const skill of operator.skills.slice(1) ) {
    skills.push(get_skill(skill));
  }
  operator.skills = skills;

  const upgrades = [];
  for( const { elite, skills } of operator.upgrades ) {
    if( elite ) {
      const { id: _, ...cost } = r.up[elite.id];
      const upgrade = { kind: 'ELITE', level: elite.level, cost };
      upgrades.push(get_upgrade(upgrade));
    }

    if( elite?.level === 2 ) {
      for( let i = 0; i < 3; ++i ) {
        if( skills?.[i] ) {
          for( const { id, level } of skills[i] ) {
            const { id: _, ...cost } = r.up[id];
            const upgrade = {
              kind: 'MASTERY',
              skill_id: operator.skills[i],
              level,
              cost,
            };
            upgrades.push(get_upgrade(upgrade));
          }
        }
      }
    } else {
      for( const { id, level } of skills ) {
        const { id: _, ...cost } = r.up[id];
        const upgrade = { kind: 'SKILL', level, cost };
        upgrades.push(get_upgrade(upgrade));
      }
    }
  }
  operator.upgrades = upgrades;
}



const t = {};
for( const { skills } of r.op ) {
  for( const id of skills ) {
    t[id] = (t[id] ?? 0) + 1;
  }
}
console.log(Object.entries(t).filter(([id, count]) => count > 1));



fs.writeFileSync('./scratch/operators.json', JSON.stringify(r.op, null, 2));

const skills_out = {};
for( const [ key, value ] of skills ) {
  skills_out[key] = value;
}
fs.writeFileSync('./scratch/skills.json', JSON.stringify(skills_out, null, 2));

const upgrades_out = {};
for( const [ key, value ] of upgrades ) {
  upgrades_out[key] = value;
}
fs.writeFileSync('./scratch/upgrades.json', JSON.stringify(upgrades_out, null, 2));



})();
