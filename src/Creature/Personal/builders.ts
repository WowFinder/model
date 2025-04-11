import { RawPersonalDetails } from '@wowfinder/asset-schemas';
import { Alignment, LengthUnit, MassUnit, TimeUnit } from '@wowfinder/ts-enums';
import { JsonExportable } from '@wowfinder/ts-utils';
import { Length, Mass, Time } from '../../Scalar';

type PersonalDetailsBase = {
    fullName: string;
    faith: string;
    origin: string;
    hair: string;
    eyes: string;
    skin: string;
    gender: string;
    alignment: Alignment;
    height: Length;
    weight: Mass;
    age: Time;
};

const personalDefaults: PersonalDetailsBase = {
    fullName: '',
    alignment: Alignment.neutralNeutral,
    height: new Length({
        value: 63,
        unit: LengthUnit.inch,
    }), // 5'3" ~ 1m60cm
    weight: new Mass({
        value: 143,
        unit: MassUnit.pound,
    }), // ~ 65kg
    age: new Time({
        value: 20,
        unit: TimeUnit.year,
    }),
    faith: '',
    origin: '',
    hair: '',
    eyes: '',
    skin: '',
    gender: '',
};

type PersonalDetails = PersonalDetailsBase & JsonExportable<RawPersonalDetails>;

type PersonalDetailsBuilder = PersonalDetailsBase | RawPersonalDetails;

function buildHeight(builder: PersonalDetailsBuilder['height']): Length {
    if (builder) {
        if (builder instanceof Length) {
            return builder;
        } else {
            return new Length({
                value: builder,
                unit: LengthUnit.inch,
            });
        }
    } else {
        return personalDefaults.height;
    }
}

function buildWeight(builder: PersonalDetailsBuilder['weight']): Mass {
    if (builder) {
        if (builder instanceof Mass) {
            return builder;
        } else {
            return new Mass({
                value: builder,
                unit: MassUnit.pound,
            });
        }
    } else {
        return personalDefaults.weight;
    }
}

function buildAge(builder: PersonalDetailsBuilder['age']): Time {
    if (builder) {
        if (builder instanceof Time) {
            return builder;
        } else {
            return new Time({
                value: builder,
                unit: TimeUnit.year,
            });
        }
    } else {
        return personalDefaults.age;
    }
}

export { buildAge, buildHeight, buildWeight, personalDefaults };
export type { PersonalDetails, PersonalDetailsBase, PersonalDetailsBuilder };
