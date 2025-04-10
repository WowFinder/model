import type { ClassFeature } from '@wowfinder/ts-enums';
import { CondensedProgressionFeatures } from './CondensedProgressionFeatures';
import type { ClassEntries } from '../../Class/Class';

// TODO: Refactor for testability or eliminate.
/* istanbul ignore next: untestable due to requiring circular imports */
function getClassFeatures(classes: ClassEntries): ClassFeature[] {
    return classes.map(c => c.class.featuresAtLevel(c.level)).flat();
}

// TODO: Refactor for testability or eliminate.
/* istanbul ignore next: untestable due to requiring circular imports */
function getClassFeaturesCondensed(
    classes: ClassEntries,
): CondensedProgressionFeatures {
    return new CondensedProgressionFeatures(getClassFeatures(classes));
}

export { getClassFeatures, getClassFeaturesCondensed };
