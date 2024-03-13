import { Bonus } from '../../Bonus';
import type { Character } from '../..';
import { auraBonuses } from '.';
import { Aura, BonusType } from '@wowfinder/ts-enums';

type ClassAurasCondensed = { aura: Aura; count: number }[];

function getClassAuras(char: Character): Aura[] {
    return char.classes.map(c => c.cls.auras(c.level)).flat();
}

function condenseClassAuras(auras: Aura[]): ClassAurasCondensed {
    const counts: { [key: string]: number } = {};
    for (const a of auras) {
        if (!(a in counts)) {
            counts[a] = 0;
        }
        counts[a]++;
    }
    return Object.keys(counts).map(k => ({
        aura: k as Aura,
        count: counts[k],
    }));
}

function getAuraBonuses(auras: Aura[]): Bonus {
    return Bonus.sum(
        BonusType.aura,
        ...condenseClassAuras(auras).map(({ aura, count }) =>
            auraBonuses[aura](count),
        ),
    );
}

export { condenseClassAuras, getAuraBonuses, getClassAuras };

export type { ClassAurasCondensed };
