import { ClassTier } from '@wowfinder/ts-enums';
import { RawClassAsset } from '@wowfinder/asset-schemas';

const classBuilderDefaults = {
    tier: ClassTier.base,
    goodFortitude: false,
    goodReflexes: false,
    goodWill: false,
    skillRanks: 0,
    arcane: 0,
    divine: 0,
    spontaneous: 0,
    startingWealth: 0,
    features: [],
    skills: [],
} satisfies Partial<RawClassAsset>;

type FullClassAsset = Required<Omit<RawClassAsset, 'list'>> & RawClassAsset;

function applyClassDefaults(builder: RawClassAsset): FullClassAsset {
    const res = { ...classBuilderDefaults, ...builder };
    const maxLevel =
        res.maxLevel ?? (res.tier === ClassTier.prestige ? 10 : 20);
    return { ...res, maxLevel };
}

export { applyClassDefaults };
export type { FullClassAsset };
