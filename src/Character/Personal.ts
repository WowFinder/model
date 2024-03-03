import { JsonValue } from '@wowfinder/ts-utils';
import {
    convertLength,
    convertMass,
    convertTime,
    Length,
    Mass,
    Time,
} from '../Scalar';
import { Alignment, LengthUnit, MassUnit, TimeUnit } from '@wowfinder/ts-enums';

interface DetailsCommon {
    fullName: string;
    faith: string;
    origin: string;
    hair: string;
    eyes: string;
    skin: string;
    gender: string;
}

export default interface CharPersonalDetails extends DetailsCommon {
    align: Alignment;
    height: Length;
    weight: Mass;
    age: Time;
}

interface CharPersonalDetailsBuilder extends DetailsCommon {
    [key: string]: JsonValue;
    align: string;
    height: number;
    weight: number;
    age: number;
}

const personalDefaults: CharPersonalDetails = {
    fullName: '',
    align: Alignment.NN,
    height: new Length({
        value: 63,
        unit: LengthUnit.inch,
    }), // 5'3" ~ 1m60cm
    weight: new Mass({
        value: 143,
        unit: MassUnit.lb,
    }), // ~ 65kg
    faith: '',
    origin: '',
    hair: '',
    eyes: '',
    skin: '',
    gender: '',
    age: new Time({
        value: 20,
        unit: TimeUnit.y,
    }),
};

function jsonImport(raw: any): CharPersonalDetails {
    const res = { ...personalDefaults, ...raw };
    res.align = Object.values(Alignment).includes(res.align)
        ? res.align
        : Alignment.NN;
    res.height =
        res.height instanceof Length
            ? res.height
            : new Length({ value: res.height, unit: LengthUnit.inch });
    res.weight =
        res.weight instanceof Mass
            ? res.weight
            : new Mass({ value: res.weight, unit: MassUnit.lb });
    res.age =
        res.age instanceof Time
            ? res.age
            : new Time({ value: res.age, unit: TimeUnit.y });
    return res;
}

function jsonExport(source: CharPersonalDetails): CharPersonalDetailsBuilder {
    return {
        fullName: source.fullName,
        align: source.align.toString(),
        height: convertLength(source.height, LengthUnit.inch).value,
        weight: convertMass(source.weight, MassUnit.lb).value,
        faith: source.faith,
        origin: source.origin,
        hair: source.hair,
        eyes: source.eyes,
        skin: source.skin,
        gender: source.gender,
        age: convertTime(source.age, TimeUnit.y).value,
    };
}

const personalDefaultsBuilder = jsonExport(personalDefaults);

export type { CharPersonalDetails, CharPersonalDetailsBuilder };
export { personalDefaults, personalDefaultsBuilder, jsonImport, jsonExport };
