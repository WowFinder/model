/* eslint-disable deprecation/deprecation */
import { type RawStats } from '@wowfinder/asset-schemas';
import { type JsonValue } from '@wowfinder/ts-utils';
import { Class, StatsBlock } from '../Creature';
import Race from '../Creature/Race';
import { type SimpleBonus } from '../Bonus';
import { Feat } from '../Creature/Feats/Feat';

const defaultRace = 'human.cha';
/* istanbul ignore next: deprecation (effort should be placed in removing this, rather than covering) */
/** @deprecated */
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

/* istanbul ignore next: deprecation (effort should be placed in removing this, rather than covering) */
/** @deprecated */
function checkClass(className: string): Class {
    const c = Class.load()[className];
    if (!c) {
        throw new Error(`Unknown class key: ${className}`);
    }
    return c;
}

/** @deprecated */
type FeatChoice = {
    feat: Feat;
    class?: Class;
    level: number;
};

/** @deprecated */
type FeatChoiceExport = {
    [key: string]: JsonValue;
    feat: string;
    class: string;
    level: number;
};

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

/* istanbul ignore next: deprecation (effort should be placed in removing this, rather than covering) */
/** @deprecated */
function parseFeatChoices(raw: any[]): FeatChoice[] {
    const res: FeatChoice[] = [];
    for (const f of raw.map(parseFeatChoice)) {
        if (f !== null) {
            res.push(f);
        }
    }
    return res;
}

/* istanbul ignore next: deprecation (effort should be placed in removing this, rather than covering) */
/** @deprecated */
function exportFeatchChoices(...raw: FeatChoice[]): FeatChoiceExport[] {
    return raw.map(f => ({
        feat: f.feat,
        class: f.class?.key ?? '',
        level: f.level,
    }));
}

/* istanbul ignore next: deprecation (effort should be placed in removing this, rather than covering) */
/** @deprecated */
function buildStats({
    base,
    race,
    auras,
    gear,
}: {
    base: RawStats;
    race: Race;
    auras: SimpleBonus;
    gear: SimpleBonus;
}): StatsBlock {
    return new StatsBlock({
        base,
        racial: race.statMods,
        // TODO #445: enhance
        gear: gear.stats,
        misc: auras.stats,
        // TODO #445: temp
    });
}

export {
    /** @deprecated */ buildStats,
    /** @deprecated */ checkClass,
    /** @deprecated */ checkRace,
    /** @deprecated */ exportFeatchChoices,
    /** @deprecated */ parseFeatChoices,
};
export type {
    /** @deprecated */ FeatChoice,
    /** @deprecated */ FeatChoiceExport,
};
