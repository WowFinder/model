import { RawClassAsset } from '@wowfinder/asset-schemas';
import { ClassTier, Skill } from '@wowfinder/ts-enums';
import { mockedMeleeClassRawAsset } from './mockedMeleeClassRawAsset';
import { mockedArcaneClassRawAsset } from './mockedArcaneClassRawAsset';
import { mockedDivineClassRawAsset } from './mockedDivineClassRawAsset';
import { mockedStealthClassRawAsset } from './mockedStealthClassRawAsset';

const mockedSuperHybridClassRawAsset: RawClassAsset = {
    key: 'mocked-super-hybrid-class',
    tier: ClassTier.advanced,
    maxLevel: 10,
    hitDie: 8,
    baseAttackProgression: 0.75,
    goodSaves: {
        fortitude: true,
        reflexes: true,
        will: true,
    },
    spellCasting: {
        divine: 2.0 / 3.0,
        spontaneous: 2.0 / 3.0,
    },
    skillRanks: 6,
    startingWealth: 10000,
    // Arbitrary inclusion of skills: taking any skill with an even length key
    skills: Object.values(Skill).filter(s => `${s}`.length % 2 === 0),
    features: [
        ...mockedMeleeClassRawAsset.features,
        ...mockedArcaneClassRawAsset.features,
        ...mockedDivineClassRawAsset.features,
        ...mockedStealthClassRawAsset.features,
    ],
};

export { mockedSuperHybridClassRawAsset };
