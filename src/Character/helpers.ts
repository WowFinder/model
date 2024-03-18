import { JsonValue } from '@wowfinder/ts-utils';
import { Bonus } from './Bonus';
import { Class } from '../Creature/Class';
import { Feat } from './Feats';
import Race from '../Creature/Race';
import { StatsBlock } from 'Creature/Stats';
import { Stats } from '@wowfinder/asset-schemas';

const defaultRace = 'human.cha';
function checkRace(raceName: string | Race): Race {
    if (raceName instanceof Race) {
        return raceName;
    }
    const r = Race.load()[raceName || defaultRace];
    if (!r) {
        throw new Error(`Unknown race key: ${raceName}`);
    }
    return r;
}

function checkClass(className: string): Class {
    const c = Class.load()[className];
    if (!c) {
        throw new Error(`Unknown class key: ${className}`);
    }
    return c;
}

interface FeatChoice {
    feat: Feat;
    class?: Class;
    level: number;
}

interface FeatChoiceExport {
    [key: string]: JsonValue;
    feat: string;
    class: string;
    level: number;
}

function parseFeatChoice(raw: any): FeatChoice | null {
    const res = { ...raw };
    if (res.class) {
        if (!(res.class instanceof Class)) {
            const k = res.class;
            res.class = Class.load()[k];
            if (!res.class) {
                console.warn(`Unknown class key: ${k}`);
                return null;
            }
        }
    }
    if (!Object.keys(Feat).includes(res.feat)) {
        console.warn(`Unknown feat key: ${res.feat}`);
        return null;
    }
    return res;
}

function parseFeatChoices(raw: any[]): FeatChoice[] {
    const res: FeatChoice[] = [];
    for (const f of raw.map(parseFeatChoice)) {
        if (f !== null) {
            res.push(f);
        }
    }
    return res;
}

function exportFeatchChoices(...raw: FeatChoice[]): FeatChoiceExport[] {
    return raw.map(f => ({
        feat: f.feat,
        class: f.class?.key ?? '',
        level: f.level,
    }));
}

function buildStats({
    base,
    race,
    auras,
    gear,
}: {
    base: Stats;
    race: Race;
    auras: Bonus;
    gear: Bonus;
}): StatsBlock {
    return new StatsBlock({
        base,
        racial: race.statMods,
        // TODO #445: enhance
        gear: gear.stats.values,
        misc: auras.stats.values,
        // TODO #445: temp
    });
}

export type { FeatChoice, FeatChoiceExport };
export {
    checkRace,
    checkClass,
    parseFeatChoices,
    exportFeatchChoices,
    buildStats,
};
