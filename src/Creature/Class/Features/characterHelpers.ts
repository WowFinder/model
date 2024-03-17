import { ClassFeature, CondensedClassFeatures } from '.';
import { CreatureBase } from 'Creature/base';

// TODO: Refactor for testability or eliminate.
/* istanbul ignore next: untestable due to requiring circular imports */
function getClassFeatures(char: CreatureBase): ClassFeature[] {
    return char.classes.map(c => c.class.features(c.level)).flat();
}

// TODO: Refactor for testability or eliminate.
/* istanbul ignore next: untestable due to requiring circular imports */
function getClassFeaturesCondensed(char: CreatureBase): CondensedClassFeatures {
    return new CondensedClassFeatures(getClassFeatures(char));
}

export { getClassFeatures, getClassFeaturesCondensed };
