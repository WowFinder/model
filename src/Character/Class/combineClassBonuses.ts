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
        result.hp += hdFirst(classLevels[0].cls.hitDie);
    }
    for (const { cls, level } of classLevels) {
        result.hp += hdAverage(cls.hitDie) * level;
        result.bab += cls.baseAttackProgression * level;
        result.saves.fort += (cls.saves.fortitude ? 1 / 2 : 1 / 3) * level;
        goodSaves.fort ||= cls.saves.fortitude;
        result.saves.refl += (cls.saves.reflexes ? 1 / 2 : 1 / 3) * level;
        goodSaves.refl ||= cls.saves.reflexes;
        result.saves.will += (cls.saves.will ? 1 / 2 : 1 / 3) * level;
        goodSaves.will ||= cls.saves.will;
        result.efl.arcane += cls.casting.arcane * level;
        result.efl.divine += cls.casting.divine * level;
        result.efl.spontaneous += cls.casting.spontaneous * level;
        result.skillRanks += cls.skillRanks * level;
        for (const f of cls.featuresList.filter(f => f.level <= level)) {
            result.features[f.feature] = (result.features[f.feature] ?? 0) + 1;
        }
        cls.classSkills.forEach((value: Skill) =>
            result.classSkills.add(value),
        );
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
