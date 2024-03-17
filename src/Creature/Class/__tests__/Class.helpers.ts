import { sum } from '@wowfinder/ts-utils';
import { mockedSuperHybridClassRawAsset } from '__mocks__';
import { Class } from '../Class';
import { ClassFeature } from '../Features';

const hybrid = new Class(mockedSuperHybridClassRawAsset);
const cmp = (a: any, b: any): number => `${a}`.localeCompare(`${b}`);
const expectedByLevelUnsorted = [
    [], // omit index/level 0
    [
        ClassFeature.bonusCombatFeat,
        ClassFeature.tauntAttack,
        ClassFeature.arcaneBond,
        ClassFeature.arcaneSchool,
        ClassFeature.bloodline,
        ClassFeature.deityAura,
        ClassFeature.channel,
        ClassFeature.domains,
        ClassFeature.sneak,
        ClassFeature.trapfinding,
        ClassFeature.featScribeScroll,
        ClassFeature.featSchewMaterials,
    ],
    [
        ClassFeature.bonusCombatFeat,
        ClassFeature.bravery,
        ClassFeature.evasion,
        ClassFeature.rogueTalent,
        ClassFeature.tauntTarget,
    ],
    [
        ClassFeature.armorTraining,
        ClassFeature.attonementMelee,
        ClassFeature.bloodlinePower,
        ClassFeature.bloodlineSpell,
        ClassFeature.channel,
        ClassFeature.sneak,
        ClassFeature.trapSense,
    ],
    [
        ClassFeature.bonusCombatFeat,
        ClassFeature.evocation,
        ClassFeature.rogueTalent,
        ClassFeature.tauntArea,
        ClassFeature.uncannyDodge,
    ],
    [
        ClassFeature.bloodlineSpell,
        ClassFeature.bonusArcaneFeat,
        ClassFeature.channel,
        ClassFeature.sneak,
        ClassFeature.weaponTraining,
    ],
    [
        ClassFeature.attonementRanged,
        ClassFeature.bonusCombatFeat,
        ClassFeature.bravery,
        ClassFeature.rogueTalent,
        ClassFeature.trapSense,
    ],
    [
        ClassFeature.armorTraining,
        ClassFeature.bloodlineFeat,
        ClassFeature.bloodlineSpell,
        ClassFeature.channel,
        ClassFeature.sneak,
    ],
    [
        ClassFeature.bonusCombatFeat,
        ClassFeature.improvedUncannyDodge,
        ClassFeature.rogueTalent,
        ClassFeature.sunderArmor,
    ],
    [
        ClassFeature.attonementSpell,
        ClassFeature.bloodlinePower,
        ClassFeature.bloodlineSpell,
        ClassFeature.channel,
        ClassFeature.sneak,
        ClassFeature.trapSense,
        ClassFeature.weaponTraining,
    ],
    [
        ClassFeature.advancedTalents,
        ClassFeature.bonusArcaneFeat,
        ClassFeature.bonusCombatFeat,
        ClassFeature.bravery,
        ClassFeature.rogueTalent,
    ],
];
const expectedByLevel = expectedByLevelUnsorted.map(l => l.toSorted(cmp));
const totalFeatureCountAtLevel = (level: number): number =>
    sum(...expectedByLevel.slice(1, level + 1).map(l => l.length));

export { hybrid, cmp, expectedByLevel, totalFeatureCountAtLevel };
