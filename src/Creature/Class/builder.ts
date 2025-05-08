import { ClassTier, type Save } from '@wowfinder/ts-enums';
import { type RawClassAsset } from '@wowfinder/asset-schemas';
import { type CastingModeValues } from '../../Magic';

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
    return {
        ...res,
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
