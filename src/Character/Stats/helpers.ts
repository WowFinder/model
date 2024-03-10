import { sum } from '@wowfinder/ts-utils';
import { Mass } from '../../Scalar';
import { MassUnit, Stat } from '@wowfinder/ts-enums';

function statMod(stat: number): number {
    return Math.floor(stat / 2 - 5);
}

type StatSet = { [key in Stat]: number };

type PartialStatSet = { [key in Stat]?: number };

function fillStatSet(base: PartialStatSet, defaultValue: number = 0): StatSet {
    return {
        strength: base.strength ?? defaultValue,
        dexterity: base.dexterity ?? defaultValue,
        constitution: base.constitution ?? defaultValue,
        intelligence: base.intelligence ?? defaultValue,
        wisdom: base.wisdom ?? defaultValue,
        charisma: base.charisma ?? defaultValue,
    };
}

function addStatSets(...args: StatSet[]): StatSet {
    return {
        strength: sum(...args.map(s => s.strength)),
        dexterity: sum(...args.map(s => s.dexterity)),
        constitution: sum(...args.map(s => s.constitution)),
        intelligence: sum(...args.map(s => s.intelligence)),
        wisdom: sum(...args.map(s => s.wisdom)),
        charisma: sum(...args.map(s => s.charisma)),
    };
}

function scaleStatSet(stats: StatSet, factor: number): StatSet {
    return {
        strength: Math.floor(stats.strength * factor),
        dexterity: Math.floor(stats.dexterity * factor),
        constitution: Math.floor(stats.constitution * factor),
        intelligence: Math.floor(stats.intelligence * factor),
        wisdom: Math.floor(stats.wisdom * factor),
        charisma: Math.floor(stats.charisma * factor),
    };
}

const baseDefault: StatSet = {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
};

const zeroDefault: StatSet = {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
};

type PartialStatBlock = {
    base?: StatSet;
    racial?: StatSet;
    enhance?: StatSet;
    gear?: StatSet;
    misc?: StatSet;
    temp?: StatSet;
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
    StatSet,
    PartialStatSet,
    fillStatSet,
    PartialStatBlock,
    addStatSets,
    scaleStatSet,
    baseDefault,
    zeroDefault,
    statMod,
    carry,
};
