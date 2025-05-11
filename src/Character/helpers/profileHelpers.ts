import { mkCounter } from '@wowfinder/ts-utils';
import {
    addStatSets,
    combineClassBonuses,
    fillSaves,
    statMod,
    type CreatureBase,
} from '../../Creature';
import {
    defaultBreathProfile,
    defaultSleepProfile,
    type FeatsProfile,
    SpeedsProfile,
    type CreatureBaseProfile,
} from '../../Profile';
import { type RawResistances, type RawSkills } from '@wowfinder/asset-schemas';
import { DamageType, Skill } from '@wowfinder/ts-enums';
import { type MultiBonus, SimpleBonus } from '../../Bonus';
import { type Feat } from '../../Creature/Feats/Feat';

function fillSkills(skills: Partial<RawSkills>): RawSkills {
    return Object.keys(Skill).reduce((acc, sk) => {
        const skill = sk as keyof RawSkills;
        acc[skill] = skills[skill] ?? 0;
        return acc;
    }, {} as RawSkills);
}

function fillResistances(resistances: Partial<RawResistances>): RawResistances {
    return Object.keys(DamageType).reduce((acc, dt) => {
        const damageType = dt as keyof RawResistances;
        acc[damageType] = resistances[damageType] ?? 0;
        return acc;
    }, {} as RawResistances);
}

function getBaseProfile(creature: CreatureBase): CreatureBaseProfile {
    const stats = addStatSets(creature.baseStats, creature.race.statMods);
    const totalLevel = creature.classes.reduce(
        (acc, cls) => acc + cls.level,
        0,
    );
    const classMods = combineClassBonuses(creature.classes);
    const hp = classMods.hp + totalLevel * statMod(stats.constitution);
    return {
        stats: addStatSets(creature.baseStats, creature.race.statMods),
        speeds: new SpeedsProfile({
            ...creature.race.speeds.export(),
            dexBonus: statMod(stats.dexterity),
        }),
        vitals: {
            hp: mkCounter({
                max: hp,
            }),
            sanity: mkCounter({ max: 0 }),
            // https://github.com/WowFinder/model/issues/210: support sleep details in race definitions
            sleep: defaultSleepProfile,
            // https://github.com/WowFinder/model/issues/210: support breath details in race definitions
            breath: defaultBreathProfile,
        },
        skills: fillSkills(creature.race.skillMods),
        saves: { ...creature.race.saves },
        // https://github.com/WowFinder/model/issues/212: support resistance details in race definitions
        resistances: fillResistances({}),
        features: classMods.features,
        feats: creature.feats.reduce(
            (acc, f) => {
                const feat = f as Feat;
                acc[feat] = (acc[feat] ?? 0) + 1;
                return acc;
            },
            {} as FeatsProfile,
        ),
    };
}

function profileAsBonus(profile: CreatureBaseProfile): SimpleBonus {
    return new SimpleBonus({
        hp: profile.vitals.hp.max,
        stats: profile.stats,
        skills: profile.skills,
        // https://github.com/WowFinder/model/issues/211: include saves bonuses
        resistances: profile.resistances,
        // https://github.com/WowFinder/model/issues/210: handle vitals
        feats: Object.keys(profile.feats).reduce((acc, f) => {
            const feat = f as Feat;
            const count = profile.feats[feat] as number;
            for (let i = 0; i < count; i++) {
                acc.push(feat);
            }
            return acc;
        }, [] as Feat[]),
    });
}

function bonusAsProfile(bonus: SimpleBonus): CreatureBaseProfile {
    const stats = bonus.stats;
    return {
        stats: bonus.stats.export(),
        speeds: new SpeedsProfile({
            base: 0,
            ...bonus.baseSpeeds.export(),
            dexBonus: statMod(stats.dexterity),
        }),
        vitals: {
            hp: mkCounter({
                max: bonus.hp,
            }),
            sanity: mkCounter({ max: 0 }),
        },
        skills: fillSkills(bonus.skills),
        saves: fillSaves(bonus.saves.export()),
        resistances: fillResistances(bonus.resistances),
        features: {},
        feats: bonus.feats.export().reduce(
            (acc, f) => {
                const feat = f;
                acc[feat] = (acc[feat] ?? 0) + 1;
                return acc;
            },
            {} as CreatureBaseProfile['feats'],
        ),
    };
}

// https://github.com/WowFinder/model/issues/213: rewrite addition logic
function totalize(
    base: CreatureBaseProfile,
    bonuses: MultiBonus,
): CreatureBaseProfile {
    const asBonus = profileAsBonus(base);
    const combined = SimpleBonus.sum(asBonus, bonuses.total);
    return bonusAsProfile(combined);
}

export { getBaseProfile, totalize };
