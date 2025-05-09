import { sum } from '@wowfinder/ts-utils';
import {
    type Requirement,
    type CharacterRequirementsPlaceholder,
} from './base';
import { combineClassBonuses } from '../../Creature';

abstract class LevelRequirementBase
    implements Requirement<CharacterRequirementsPlaceholder>
{
    readonly #level: number;
    constructor(level: number) {
        this.#level = level;
    }

    get level(): number {
        return this.#level;
    }

    abstract test(value: CharacterRequirementsPlaceholder): boolean;
}

class CharacterLevelRequirement extends LevelRequirementBase {
    test(value: CharacterRequirementsPlaceholder): boolean {
        return (
            sum(
                ...value.baseProfile.progression.classes.map(
                    entry => entry.level,
                ),
            ) >= this.level
        );
    }
}

class CasterLevelRequirement extends LevelRequirementBase {
    test(value: CharacterRequirementsPlaceholder): boolean {
        const { efl } = combineClassBonuses(
            value.baseProfile.progression.classes,
        );
        return efl.arcane + efl.divine + efl.spontaneous >= this.level;
    }
}

class AttackBonusRequirement extends LevelRequirementBase {
    test(value: CharacterRequirementsPlaceholder): boolean {
        const { bab } = combineClassBonuses(
            value.baseProfile.progression.classes,
        );
        return bab >= this.level;
    }
}

export {
    AttackBonusRequirement,
    CasterLevelRequirement,
    CharacterLevelRequirement,
};
