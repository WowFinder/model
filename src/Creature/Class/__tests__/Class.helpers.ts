import { sum } from '@wowfinder/ts-utils';
import { mockSuperHybridClassRawAsset } from '../../../__mocks__';
import { Class } from '../Class';
import { ProgressionFeature } from '../../Progression/Features';

const hybrid = new Class(mockSuperHybridClassRawAsset);
const cmp = (a: any, b: any): number => `${a}`.localeCompare(`${b}`);
const expectedByLevelUnsorted = [
    [], // omit index/level 0
    [
        ProgressionFeature.bonusCombatFeat,
        ProgressionFeature.tauntAttack,
        ProgressionFeature.arcaneBond,
        ProgressionFeature.arcaneSchool,
        ProgressionFeature.bloodline,
        ProgressionFeature.deityAura,
        ProgressionFeature.channel,
        ProgressionFeature.domains,
        ProgressionFeature.sneak,
        ProgressionFeature.trapfinding,
        ProgressionFeature.featScribeScroll,
        ProgressionFeature.featSchewMaterials,
    ],
    [
        ProgressionFeature.bonusCombatFeat,
        ProgressionFeature.bravery,
        ProgressionFeature.evasion,
        ProgressionFeature.rogueTalent,
        ProgressionFeature.tauntTarget,
    ],
    [
        ProgressionFeature.armorTraining,
        ProgressionFeature.attonementMelee,
        ProgressionFeature.bloodlinePower,
        ProgressionFeature.bloodlineSpell,
        ProgressionFeature.channel,
        ProgressionFeature.sneak,
        ProgressionFeature.trapSense,
    ],
    [
        ProgressionFeature.bonusCombatFeat,
        ProgressionFeature.evocation,
        ProgressionFeature.rogueTalent,
        ProgressionFeature.tauntArea,
        ProgressionFeature.uncannyDodge,
    ],
    [
        ProgressionFeature.bloodlineSpell,
        ProgressionFeature.bonusArcaneFeat,
        ProgressionFeature.channel,
        ProgressionFeature.sneak,
        ProgressionFeature.weaponTraining,
    ],
    [
        ProgressionFeature.attonementRanged,
        ProgressionFeature.bonusCombatFeat,
        ProgressionFeature.bravery,
        ProgressionFeature.rogueTalent,
        ProgressionFeature.trapSense,
    ],
    [
        ProgressionFeature.armorTraining,
        ProgressionFeature.bloodlineFeat,
        ProgressionFeature.bloodlineSpell,
        ProgressionFeature.channel,
        ProgressionFeature.sneak,
    ],
    [
        ProgressionFeature.bonusCombatFeat,
        ProgressionFeature.improvedUncannyDodge,
        ProgressionFeature.rogueTalent,
        ProgressionFeature.sunderArmor,
    ],
    [
        ProgressionFeature.attonementSpell,
        ProgressionFeature.bloodlinePower,
        ProgressionFeature.bloodlineSpell,
        ProgressionFeature.channel,
        ProgressionFeature.sneak,
        ProgressionFeature.trapSense,
        ProgressionFeature.weaponTraining,
    ],
    [
        ProgressionFeature.advancedTalents,
        ProgressionFeature.bonusArcaneFeat,
        ProgressionFeature.bonusCombatFeat,
        ProgressionFeature.bravery,
        ProgressionFeature.rogueTalent,
    ],
];
const expectedByLevel = expectedByLevelUnsorted.map(l => l.toSorted(cmp));
const totalFeatureCountAtLevel = (level: number): number =>
    sum(...expectedByLevel.slice(1, level + 1).map(l => l.length));

export { hybrid, cmp, expectedByLevel, totalFeatureCountAtLevel };
