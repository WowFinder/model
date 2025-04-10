import type {
    ProgressionFeature,
    ProgressionFeaturesCondensed,
} from '../../../../Creature/Progression/Features';

const simpleMartialClassFeatureListMock: ProgressionFeature[] = [
    'bonusCombatFeat',
    'weaponTraining',
    'bonusCombatFeat',
    'weaponTraining',
    'bonusCombatFeat',
    'armorTraining',
];

const simpleMartialClassFeatureCountsMock: ProgressionFeaturesCondensed = [
    { feature: 'bonusCombatFeat', count: 3 },
    { feature: 'weaponTraining', count: 2 },
    { feature: 'armorTraining', count: 1 },
];

export {
    simpleMartialClassFeatureListMock,
    simpleMartialClassFeatureCountsMock,
};
