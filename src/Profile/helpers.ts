import { DamageType, Skill, Stat } from '@wowfinder/ts-enums';
import {
    FeatsBonus,
    ResistancesBonus,
    type SimpleBonus,
    SkillsBonus,
    StatsBonus,
} from '../Bonus';
import {
    type FeatsProfile,
    type ResistancesProfile,
    type SavesProfile,
    type SkillsProfile,
    type StatsProfile,
} from './raw';
import { SavesBonus } from '../Bonus/SavesBonus';
import { type CreatureBaseProfile } from './CreatureProfile';
import { addSpeeds } from './SpeedsProfile';
import { addVitals } from './VitalsProfile';
import { Feat } from '../Creature/Feats';

function addStats(base: StatsProfile, ...bonuses: StatsBonus[]): StatsProfile {
    const totalBonuses = StatsBonus.sum(...bonuses);
    const stats = { ...base };
    Object.keys(Stat).forEach(key => {
        const k = key as keyof StatsProfile;
        stats[k] += totalBonuses[k];
    });
    return stats;
}

function addSkills(
    base: SkillsProfile,
    ...bonuses: SkillsBonus[]
): SkillsProfile {
    const totalBonuses = SkillsBonus.sum(...bonuses);
    const skills = { ...base };
    Object.keys(Skill)
        .filter(k => k in totalBonuses)
        .forEach(key => {
            const k = key as keyof SkillsProfile;
            skills[k] += totalBonuses[k];
        });
    return skills;
}

function addSaves(base: SavesProfile, ...bonuses: SavesBonus[]): SavesProfile {
    const totalBonuses = SavesBonus.sum(...bonuses);
    return {
        fortitude: base.fortitude + totalBonuses.fortitude,
        reflexes: base.reflexes + totalBonuses.reflexes,
        will: base.will + totalBonuses.will,
    };
}

function addResistances(
    base: ResistancesProfile,
    ...bonuses: ResistancesBonus[]
): ResistancesProfile {
    const totalBonuses = ResistancesBonus.sum(...bonuses);
    const resistances = { ...base };
    Object.keys(DamageType).forEach(key => {
        const k = key as keyof ResistancesProfile;
        resistances[k] += totalBonuses[k];
    });
    return resistances;
}

function addFeats(base: FeatsProfile, ...bonuses: FeatsBonus[]): FeatsProfile {
    const feats = { ...base };
    const totalBonuses = FeatsBonus.max(...bonuses);

    Object.keys(Feat)
        .filter(k => totalBonuses.get(k as Feat))
        .forEach(key => {
            const k = key as Feat;
            feats[k] ??= 0;
            feats[k]++;
        });

    return feats;
}

function addProfileBonuses(
    base: CreatureBaseProfile,
    ...bonuses: SimpleBonus[]
): CreatureBaseProfile {
    return {
        ...base,
        stats: addStats(base.stats, ...bonuses.map(b => b.stats)),
        speeds: addSpeeds(base.speeds, ...bonuses.map(b => b.speedsModifiers)),
        vitals: addVitals(base.vitals, ...bonuses.map(b => b.vitals)),
        skills: addSkills(base.skills, ...bonuses.map(b => b.skills)),
        saves: addSaves(base.saves, ...bonuses.map(b => b.saves)),
        resistances: addResistances(
            base.resistances,
            ...bonuses.map(b => b.resistances),
        ),
        feats: addFeats(base.feats, ...bonuses.map(b => b.feats)),
    };
}

export {
    addStats,
    addSkills,
    addSaves,
    addResistances,
    addFeats,
    addProfileBonuses,
};
