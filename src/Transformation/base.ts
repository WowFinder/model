import { type CharacterRequirementsPlaceholder } from '../Old.Character/Requirements/base';

type Transformation = {
    apply(
        base: CharacterRequirementsPlaceholder,
    ): CharacterRequirementsPlaceholder;
};

export type { Transformation };
