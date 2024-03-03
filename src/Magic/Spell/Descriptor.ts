import {
    AlignmentDescriptor,
    EnergyType,
    SpellDescriptor,
} from '@wowfinder/ts-enums';
import { Stringifier } from '@wowfinder/ts-utils';

function tryParseSpellDescriptor(input: string): SpellDescriptor | undefined {
    return SpellDescriptor[input as keyof typeof SpellDescriptor];
}

function parseValidSpellDescriptors(inputs: any[]): SpellDescriptor[] {
    return inputs
        .map(input => tryParseSpellDescriptor(`${input}`))
        .filter(Boolean) as SpellDescriptor[];
}

const stringify: Stringifier<SpellDescriptor> = (value, t) => {
    if (AlignmentDescriptor[value as AlignmentDescriptor]) {
        return t(`alignment.${value}`);
    }
    if (EnergyType[value as EnergyType]) {
        return t(`damageTypes.full.${value}`);
    }
    return t(`magic.descriptor.${value}`);
};

export {
    SpellDescriptor,
    stringify,
    tryParseSpellDescriptor,
    parseValidSpellDescriptors,
};
