/* eslint-disable deprecation/deprecation */
import {
    PersonalDetails,
    importPersonalDetails,
} from '../../Creature/Personal';
import { OverridableCharacterBase } from './OverridableCharacterBase';
import {
    CharacterPersonalExport,
    PersonalCharacterBaseBuilder,
} from './builder';

abstract class PersonalCharacterBase extends OverridableCharacterBase {
    #personal: PersonalDetails; // Formerly: PersonalDetailsBuilder;
    constructor({ personal, ...rest }: PersonalCharacterBaseBuilder) {
        super(rest);
        this.#personal = importPersonalDetails(personal);
    }

    get personal(): PersonalDetails {
        return this.#personal;
    }

    get fullName(): string {
        return this.#personal.fullName;
    }

    toString(): string {
        return this.#personal.fullName;
    }

    export(): CharacterPersonalExport {
        return {
            ...super.export(),
            personal: this.#personal.export(),
        };
    }
}

export { PersonalCharacterBase };
