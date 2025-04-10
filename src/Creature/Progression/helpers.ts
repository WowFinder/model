import { Aura, Skill } from '@wowfinder/ts-enums';
import { type AurasList } from './Aura';
import { ProgressionFeature, type FeaturesList } from './Features';

type SavesProgression = {
    fortitude: boolean;
    reflexes: boolean;
    will: boolean;
};

type CastingProgression = {
    arcane: number;
    divine: number;
    spontaneous: number;
};

function hdAverage(hitDie: number): number {
    return Math.ceil((hitDie + 1) / 2);
}

function hdFirst(hitDie: number): number {
    return hitDie - hdAverage(hitDie);
}

const validFeatures = new Set<ProgressionFeature>(
    Object.values(ProgressionFeature),
);

function mapFeatures(
    list: { level: number; feature?: string }[],
): FeaturesList {
    return list
        .filter(entry => validFeatures.has(entry.feature as ProgressionFeature))
        .map(entry => ({
            level: entry.level,
            feature:
                ProgressionFeature[
                    entry.feature as keyof typeof ProgressionFeature
                ],
        }));
}

const validAuras = new Set(Object.values(Aura));

function mapAuras(list: { level: number; aura?: string }[]): AurasList {
    return list
        .filter(entry => entry.aura && validAuras.has(entry.aura as Aura))
        .map(entry => ({ level: entry.level, aura: entry.aura as Aura }));
}

const validSkills = new Set(Object.values(Skill));

function filterSkills(raw: string[]): Set<Skill> {
    return new Set(
        raw
            .filter(s => validSkills.has(s as Skill))
            .map(v => Skill[v as Skill]),
    );
}

export {
    hdAverage,
    hdFirst,
    mapFeatures,
    mapAuras,
    filterSkills,
    type SavesProgression,
    type CastingProgression,
};
