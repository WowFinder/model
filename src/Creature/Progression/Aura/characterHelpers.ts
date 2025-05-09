import { Aura, BonusType } from '@wowfinder/ts-enums';
import { SimpleBonus, TypedSimpleBonus } from '../../../Bonus';
import type { ClassEntries } from '../../Class/Class';
import { auraBonuses } from '.';

type ClassAurasCondensed = { aura: Aura; count: number }[];

function getClassAuras(classes: ClassEntries): Aura[] {
    return classes.map(c => c.class.aurasAtLevel(c.level)).flat();
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

function getAuraBonuses(auras: Aura[]): TypedSimpleBonus {
    return new TypedSimpleBonus({
        ...SimpleBonus.sum(
            ...condenseClassAuras(auras).map(({ aura, count }) =>
                auraBonuses[aura](count),
            ),
        ).export(),
        type: BonusType.aura,
    });
}

export { condenseClassAuras, getAuraBonuses, getClassAuras };

export type { ClassAurasCondensed };
