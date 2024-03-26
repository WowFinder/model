import { RawPersonalDetails } from '@wowfinder/asset-schemas';
import { Alignment, TimeUnit } from '@wowfinder/ts-enums';
import { Length, Mass, Time } from '../../Scalar';
import * as builders from './builders';

class PersonalDetailsImpl implements builders.PersonalDetails {
    #fullName: string;
    #faith: string;
    #origin: string;
    #hair: string;
    #eyes: string;
    #skin: string;
    #gender: string;
    #alignment: Alignment;
    #height: Length;
    #weight: Mass;
    #age: Time;

    constructor(builder: builders.PersonalDetailsBuilder) {
        this.#fullName = builder.fullName;
        this.#faith = builder.faith ?? builders.personalDefaults.faith;
        this.#origin = builder.origin ?? builders.personalDefaults.origin;
        this.#hair = builder.hair ?? builders.personalDefaults.hair;
        this.#eyes = builder.eyes ?? builders.personalDefaults.eyes;
        this.#skin = builder.skin ?? builders.personalDefaults.skin;
        this.#gender = builder.gender ?? builders.personalDefaults.gender;
        this.#alignment =
            Alignment[builder.alignment as keyof typeof Alignment] ??
            builders.personalDefaults.alignment;
        this.#height = builders.buildHeight(builder.height);
        this.#weight = builders.buildWeight(builder.weight);
        this.#age = builders.buildAge(builder.age);
    }

    get fullName(): string {
        return this.#fullName;
    }

    get faith(): string {
        return this.#faith;
    }

    get origin(): string {
        return this.#origin;
    }

    get hair(): string {
        return this.#hair;
    }

    get eyes(): string {
        return this.#eyes;
    }

    get skin(): string {
        return this.#skin;
    }

    get alignment(): Alignment {
        return this.#alignment;
    }

    get gender(): string {
        return this.#gender;
    }

    get height(): Length {
        return this.#height;
    }

    get weight(): Mass {
        return this.#weight;
    }

    get age(): Time {
        return this.#age;
    }

    export(): RawPersonalDetails {
        return {
            fullName: this.#fullName,
            faith: this.#faith,
            origin: this.#origin,
            hair: this.#hair,
            eyes: this.#eyes,
            skin: this.#skin,
            gender: this.#gender,
            alignment: this.#alignment,
            height: this.#height.inches,
            weight: this.#weight.pounds,
            age: this.#age.convert(TimeUnit.year).value,
        };
    }
}

const personalDefaultsBuilder = new PersonalDetailsImpl(
    builders.personalDefaults,
).export();

function importPersonalDetails(
    builder: builders.PersonalDetailsBuilder,
): builders.PersonalDetails {
    return new PersonalDetailsImpl(builder);
}

export { importPersonalDetails, personalDefaultsBuilder };
