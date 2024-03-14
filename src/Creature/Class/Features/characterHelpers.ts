import { ClassFeature, CondensedClassFeatures } from '.';
import { CreatureBase } from 'Creature/base';

function getClassFeatures(char: CreatureBase): ClassFeature[] {
    return char.classes.map(c => c.class.features(c.level)).flat();
}

function getClassFeaturesCondensed(char: CreatureBase): CondensedClassFeatures {
    return new CondensedClassFeatures(getClassFeatures(char));
}

export { getClassFeatures, getClassFeaturesCondensed };
