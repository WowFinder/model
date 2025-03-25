import { Skill } from '@wowfinder/ts-enums';
import { ClassBonuses } from './ClassBonuses';
import { hdFirst, hdAverage, ClassLevels } from './helpers';

const goodSave = 1.0 / 2.0;
const poorSave = 1.0 / 3.0;
const saveMult = (good: boolean): number => (good ? goodSave : poorSave);

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
        result.saves.fort += saveMult(c.saves.fortitude) * level;
        goodSaves.fort ||= c.saves.fortitude;
        result.saves.refl += saveMult(c.saves.reflexes) * level;
        goodSaves.refl ||= c.saves.reflexes;
        result.saves.will += saveMult(c.saves.will) * level;
        goodSaves.will ||= c.saves.will;
        result.efl.arcane += c.casting.arcane * level;
        result.efl.divine += c.casting.divine * level;
        result.efl.spontaneous += c.casting.spontaneous * level;
        result.skillRanks += c.skillRanks * level;
        c.featuresList
            .filter(f => f.level <= level)
            .forEach(f => {
                result.features[f.feature] =
                    (result.features[f.feature] ?? 0) + 1;
            });
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

export { combineClassBonuses, saveMult, goodSave, poorSave };
