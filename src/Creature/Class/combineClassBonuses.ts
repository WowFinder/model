import { Skill } from '@wowfinder/ts-enums';
import { ClassBonuses } from './ClassBonuses';
import { hdFirst, hdAverage, ClassLevels } from './helpers';

function combineClassBonuses(classLevels: ClassLevels): ClassBonuses {
    const goodSaves = {
        fort: false,
        refl: false,
        will: false,
    };
    const result: ClassBonuses = {
        hp: 0,
        bab: 0,
        saves: {
            fort: 0,
            refl: 0,
            will: 0,
        },
        efl: {
            arcane: 0,
            divine: 0,
            spontaneous: 0,
        },
        skillRanks: 0,
        features: {},
        classSkills: new Set<Skill>(),
    };
    if (classLevels.length > 0) {
        result.hp += hdFirst(classLevels[0].class.hitDie);
    }
    for (const { class: c, level } of classLevels) {
        result.hp += hdAverage(c.hitDie) * level;
        result.bab += c.baseAttackProgression * level;
        result.saves.fort += (c.saves.fortitude ? 1 / 2 : 1 / 3) * level;
        goodSaves.fort ||= c.saves.fortitude;
        result.saves.refl += (c.saves.reflexes ? 1 / 2 : 1 / 3) * level;
        goodSaves.refl ||= c.saves.reflexes;
        result.saves.will += (c.saves.will ? 1 / 2 : 1 / 3) * level;
        goodSaves.will ||= c.saves.will;
        result.efl.arcane += c.casting.arcane * level;
        result.efl.divine += c.casting.divine * level;
        result.efl.spontaneous += c.casting.spontaneous * level;
        result.skillRanks += c.skillRanks * level;
        for (const f of c.featuresList.filter(f => f.level <= level)) {
            result.features[f.feature] = (result.features[f.feature] ?? 0) + 1;
        }
        c.classSkills.forEach((value: Skill) => result.classSkills.add(value));
    }
    if (goodSaves.fort) {
        result.saves.fort += 2;
    }
    if (goodSaves.refl) {
        result.saves.refl += 2;
    }
    if (goodSaves.will) {
        result.saves.will += 2;
    }
    result.bab = Math.floor(result.bab);
    result.hp = Math.floor(result.hp);
    result.saves.fort = Math.floor(result.saves.fort);
    result.saves.refl = Math.floor(result.saves.refl);
    result.saves.will = Math.floor(result.saves.will);
    result.efl.arcane = Math.floor(result.efl.arcane);
    result.efl.divine = Math.floor(result.efl.divine);
    result.efl.spontaneous = Math.floor(result.efl.spontaneous);
    return result;
}

export { combineClassBonuses };
