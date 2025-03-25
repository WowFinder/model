interface EffectiveCasterLevels {
    arcane: number;
    divine: number;
    spontaneous: number;
}

const zeroCasterLevel: EffectiveCasterLevels = {
    arcane: 0,
    divine: 0,
    spontaneous: 0,
};

function buildCasterLevels(
    args: Partial<EffectiveCasterLevels>,
): EffectiveCasterLevels {
    return { ...zeroCasterLevel, ...args };
}

export type { EffectiveCasterLevels };
export { zeroCasterLevel, buildCasterLevels };
