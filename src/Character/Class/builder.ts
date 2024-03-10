import { ClassTier } from '@wowfinder/ts-enums';
import { AuraEntry } from './Aura';
import { ClassFeatureEntry } from './Features';

type RawFeaturesEntry = ClassFeatureEntry | AuraEntry;

interface ClassBuilder {
    key: string;
    tier?: ClassTier;
    maxLevel?: number;
    hd: number;
    bab: number;
    fort?: boolean;
    refl?: boolean;
    will?: boolean;
    skl?: number;
    arcane?: number;
    divine?: number;
    spontaneous?: number;
    wealth?: number;
    features?: RawFeaturesEntry[];
    skills?: string[];
}

const classBuilderDefaults = {
    tier: ClassTier.base,
    fort: false,
    refl: false,
    will: false,
    skl: 0,
    arcane: 0,
    divine: 0,
    spontaneous: 0,
    wealth: 0,
    features: [],
    skills: [],
} satisfies Partial<ClassBuilder>;

function applyClassDefaults(builder: ClassBuilder): Required<ClassBuilder> {
    const res = { ...classBuilderDefaults, ...builder };
    const maxLevel =
        res.maxLevel ?? (res.tier === ClassTier.prestige ? 10 : 20);
    return { ...res, maxLevel };
}

function preBuild(raw: any): Required<ClassBuilder> {
    // TODO #446: validate input
    return applyClassDefaults(raw as ClassBuilder);
}

export { applyClassDefaults, preBuild };
export type { ClassBuilder };
