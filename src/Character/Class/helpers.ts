import { Aura, Skill } from '@wowfinder/ts-enums';
import { AurasList } from './Aura';
import { ClassFeature, FeaturesList } from './Features';
import type { Class } from './index';

interface SavesProgression {
    fortitude: boolean;
    reflexes: boolean;
    will: boolean;
}

interface CastingProgression {
    arcane: number;
    divine: number;
    spontaneous: number;
}

type Classes = { [key: string]: Class };
type ClassLevels = { cls: Class; level: number }[];

function hdAverage(hd: number): number {
    return Math.ceil((hd + 1) / 2);
}

function hdFirst(hd: number): number {
    return hd - hdAverage(hd);
}

const validFeatures = new Set(Object.values(ClassFeature));

function mapFeatures(
    list: { level: number; feature?: string }[],
): FeaturesList {
    return list
        .filter(entry => validFeatures.has(entry.feature as ClassFeature))
        .map(entry => ({
            level: entry.level,
            feature: ClassFeature[entry.feature as keyof typeof ClassFeature],
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

export { hdAverage, hdFirst, mapFeatures, mapAuras, filterSkills };
export type { Classes, ClassLevels, SavesProgression, CastingProgression };
