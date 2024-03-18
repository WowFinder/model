import { Bonus } from '../../../Character/Bonus';
import { auraBonuses } from '.';
import { Aura, BonusType } from '@wowfinder/ts-enums';
import { ClassEntries } from '../Class';

type ClassAurasCondensed = { aura: Aura; count: number }[];

function getClassAuras(classes: ClassEntries): Aura[] {
    return classes.map(c => c.class.auras(c.level)).flat();
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
