import { type CharacterRequirementsPlaceholder } from '../Character/Requirements/base';

type Transformation = {
    apply(
        base: CharacterRequirementsPlaceholder,
    ): CharacterRequirementsPlaceholder;
};

export type { Transformation };
