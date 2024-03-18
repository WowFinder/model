import { sum } from '@wowfinder/ts-utils';
import { Mass } from 'Scalar';
import { MassUnit } from '@wowfinder/ts-enums';
import { Stats } from '@wowfinder/asset-schemas';

function statMod(stat: number): number {
    return Math.floor(stat / 2 - 5);
}

function fillStatSet(base: Partial<Stats>, defaultValue: number = 0): Stats {
    return {
        strength: base.strength ?? defaultValue,
        dexterity: base.dexterity ?? defaultValue,
        constitution: base.constitution ?? defaultValue,
        intelligence: base.intelligence ?? defaultValue,
        wisdom: base.wisdom ?? defaultValue,
        charisma: base.charisma ?? defaultValue,
    };
}

function addStatSets(...args: Stats[]): Stats {
    return {
        strength: sum(...args.map(s => s.strength)),
        dexterity: sum(...args.map(s => s.dexterity)),
        constitution: sum(...args.map(s => s.constitution)),
        intelligence: sum(...args.map(s => s.intelligence)),
        wisdom: sum(...args.map(s => s.wisdom)),
        charisma: sum(...args.map(s => s.charisma)),
    };
}

function scaleStatSet(stats: Stats, factor: number): Stats {
    return {
        strength: Math.floor(stats.strength * factor),
        dexterity: Math.floor(stats.dexterity * factor),
        constitution: Math.floor(stats.constitution * factor),
        intelligence: Math.floor(stats.intelligence * factor),
        wisdom: Math.floor(stats.wisdom * factor),
        charisma: Math.floor(stats.charisma * factor),
    };
}

const baseDefault: Stats = {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
};

const zeroDefault: Stats = {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
};

type PartialStatBlock = {
    base?: Stats;
    racial?: Stats;
    enhance?: Stats;
    gear?: Stats;
    misc?: Stats;
    temp?: Stats;
};

function carry(str: number): Mass {
    if (str <= 0) {
        return new Mass({ value: 0, unit: MassUnit.pound });
    }
    let mult = 1;
    while (str > 20) {
        mult *= 4;
        str -= 10;
    }
    const base = [
        10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 115, 130, 150, 175, 200, 230,
        260, 300, 350, 400,
    ];
    return new Mass({
        value: Math.floor(base[str - 1] * mult),
        unit: MassUnit.pound,
    });
}

export {
    fillStatSet,
    PartialStatBlock,
    addStatSets,
    scaleStatSet,
    baseDefault,
    zeroDefault,
    statMod,
    carry,
};
