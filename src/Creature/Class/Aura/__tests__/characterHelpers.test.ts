import { Aura, BonusType } from '@wowfinder/ts-enums';
import {
    condenseClassAuras,
    getAuraBonuses,
    getClassAuras,
} from '../characterHelpers';
import { auraBonuses } from '..';
import { Bonus } from 'Character/Bonus';
import { Character } from 'Character';

const auras: Record<string, Aura[]> = {
    empty: [],
    repeated: [Aura.arcane, Aura.arcane, Aura.arcane],
    mixed: [Aura.arcane, Aura.arcane, Aura.commanding],
};

function auraMocker(Aura: Aura): (level: number) => Aura[] {
    return (level: number) => {
        const auraRank = Math.floor((level - 2) / 4);
        return Array(auraRank).fill(Aura);
    };
}

const charMock = {
    classes: [
        {
            cls: {
                auras: auraMocker(Aura.arcane),
            },
            level: 14,
        },
        {
            cls: {
                auras: auraMocker(Aura.commanding),
            },
            level: 9,
        },
    ],
} as Character;
const charMockEmpty = {
    classes: [],
} as unknown as Character;

describe('condenseClassAuras', () => {
    it('should return an empty array if no auras are present', () => {
        expect(condenseClassAuras(auras.empty)).toEqual([]);
    });
    it('should return a single entry for a repeated aura', () => {
        expect(condenseClassAuras(auras.repeated)).toEqual([
            { aura: Aura.arcane, count: 3 },
        ]);
    });
    it('should combine different auras', () => {
        expect(condenseClassAuras(auras.mixed)).toEqual([
            { aura: Aura.arcane, count: 2 },
            { aura: Aura.commanding, count: 1 },
        ]);
    });
});

describe('getAuraBonuses', () => {
    it('should return an empty bonus if no auras are present', () => {
        expect(getAuraBonuses(auras.empty)).toEqual({
            ...Bonus.zero(BonusType.aura),
        });
    });
    it('should return a single bonus for a repeated aura', () => {
        expect(getAuraBonuses(auras.repeated)).toEqual({
            ...Bonus.sum(BonusType.aura, auraBonuses[Aura.arcane](3)),
        });
    });
    it('should combine different auras', () => {
        expect(getAuraBonuses(auras.mixed)).toEqual({
            ...Bonus.sum(
                BonusType.aura,
                auraBonuses[Aura.arcane](2),
                auraBonuses[Aura.commanding](1),
            ),
        });
    });
});

describe('getClassAuras', () => {
    it('should return an empty array if no classes are present', () => {
        expect(getClassAuras(charMockEmpty)).toEqual([]);
    });
    it('should return a single aura for a single class', () => {
        expect(getClassAuras(charMock)).toEqual([
            Aura.arcane,
            Aura.arcane,
            Aura.arcane,
            Aura.commanding,
        ]);
    });
});
