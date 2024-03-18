import { ClassFeature, CondensedClassFeatures } from '.';
import { ClassEntries } from '../Class';

// TODO: Refactor for testability or eliminate.
/* istanbul ignore next: untestable due to requiring circular imports */
function getClassFeatures(classes: ClassEntries): ClassFeature[] {
    return classes.map(c => c.class.features(c.level)).flat();
}

// TODO: Refactor for testability or eliminate.
/* istanbul ignore next: untestable due to requiring circular imports */
function getClassFeaturesCondensed(
    classes: ClassEntries,
): CondensedClassFeatures {
    return new CondensedClassFeatures(getClassFeatures(classes));
}

export { getClassFeatures, getClassFeaturesCondensed };
