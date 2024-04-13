import type {
    ClassFeature,
    ClassFeaturesCondensed,
} from '../../../../Creature/Class/Features';

const simpleMartialClassFeatureListMock: ClassFeature[] = [
    'bonusCombatFeat',
    'weaponTraining',
    'bonusCombatFeat',
    'weaponTraining',
    'bonusCombatFeat',
    'armorTraining',
];

const simpleMartialClassFeatureCountsMock: ClassFeaturesCondensed = [
    { feature: 'bonusCombatFeat', count: 3 },
    { feature: 'weaponTraining', count: 2 },
    { feature: 'armorTraining', count: 1 },
];

export {
    simpleMartialClassFeatureListMock,
    simpleMartialClassFeatureCountsMock,
};
