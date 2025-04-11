import { Size } from '@wowfinder/ts-enums';
import { PartialStatBlock } from '../Stats';

type ArmorValuesBuilder = {
    /** @deprecated use `gear` instead */
    armor?: number;
    /** @deprecated use `gear` instead */
    shield?: number;
    /** @deprecated use `deflection` instead */
    dodge?: number;
    natural?: number;
    deflection?: number;
    misc?: number;
    miscPhysical?: number;
    miscEvasion?: number;
    temporary?: number;
    temporaryPhysical?: number;
    temporaryEvasion?: number;
};

type FullArmorValuesBuilder = ArmorValuesBuilder & {
    strength?: number;
    dexterity?: number;
    baseAttack?: number;
    size?: number;
};

type FullFromBaseBuilder = {
    base: ArmorValuesBuilder;
    stats: PartialStatBlock;
    baseAttack: number;
    size: Size;
};

export type { ArmorValuesBuilder, FullArmorValuesBuilder, FullFromBaseBuilder };
