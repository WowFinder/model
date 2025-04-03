import { RawResistances } from '@wowfinder/asset-schemas';
import { BonusType, DamageType } from '@wowfinder/ts-enums';

type FullResistances = {
    [key in keyof typeof BonusType]: RawResistances;
};

type ResistanceBreakdown = {
    [key in keyof typeof BonusType]: number;
} & {
    get total(): number;
};

const totalize = (
    breakdown: Omit<ResistanceBreakdown, 'total'>,
): ResistanceBreakdown => {
    return {
        ...breakdown,
        get total() {
            return Object.keys(BonusType).reduce((acc, key) => {
                const value = this[key as keyof typeof BonusType];
                return acc + value;
            }, 0);
        },
    };
};

type FullResistancesByType = {
    [key in keyof RawResistances]: ResistanceBreakdown;
};

const breakdown = (
    resistances: FullResistances,
    type: keyof RawResistances,
): ResistanceBreakdown => {
    return totalize({
        gear: resistances.gear[type],
        enhancement: resistances.enhancement[type],
        deflection: resistances.deflection[type],
        natural: resistances.natural[type],
        temporal: resistances.temporal[type],
        aura: resistances.aura[type],
    });
};

const breakdownByType = (
    resistances: FullResistances,
): FullResistancesByType => {
    return {
        bludgeoning: breakdown(resistances, DamageType.bludgeoning),
        slashing: breakdown(resistances, DamageType.slashing),
        piercing: breakdown(resistances, DamageType.piercing),
        arcane: breakdown(resistances, DamageType.arcane),
        fire: breakdown(resistances, DamageType.fire),
        cold: breakdown(resistances, DamageType.cold),
        nature: breakdown(resistances, DamageType.nature),
        shadow: breakdown(resistances, DamageType.shadow),
        holy: breakdown(resistances, DamageType.holy),
        psychic: breakdown(resistances, DamageType.psychic),
    };
};

export {
    type FullResistances,
    type ResistanceBreakdown,
    type FullResistancesByType,
    breakdownByType,
};
