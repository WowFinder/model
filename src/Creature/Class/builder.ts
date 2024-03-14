import { ClassTier, Save } from '@wowfinder/ts-enums';
import { RawClassAsset } from '@wowfinder/asset-schemas';
import { CastingModeValues } from 'Magic';

type GoodSaves = { [key in Save]: boolean };
type SpellCasting = CastingModeValues<number>;

const classBuilderDefaults = {
    tier: ClassTier.base,
    goodSaves: {
        fortitude: false,
        reflexes: false,
        will: false,
    } as GoodSaves,
    skillRanks: 0,
    spellCasting: {
        arcane: 0,
        divine: 0,
        spontaneous: 0,
    } as SpellCasting,
    startingWealth: 0,
    features: [],
    skills: [],
} satisfies Partial<RawClassAsset>;

type FullClassAsset = Required<Omit<RawClassAsset, 'list'>> &
    RawClassAsset & {
        goodSaves: GoodSaves;
        spellCasting: CastingModeValues<number>;
    };

function applyClassDefaults(builder: RawClassAsset): FullClassAsset {
    const res = { ...classBuilderDefaults, ...builder };
    const defaultMaxLevel = res.tier === ClassTier.prestige ? 10 : 20;
    return {
        ...res,
        maxLevel: res.maxLevel ?? defaultMaxLevel,
        goodSaves: {
            ...classBuilderDefaults.goodSaves,
            ...res.goodSaves,
        },
        spellCasting: {
            ...classBuilderDefaults.spellCasting,
            ...res.spellCasting,
        },
    };
}

export { applyClassDefaults };
export type { FullClassAsset };
