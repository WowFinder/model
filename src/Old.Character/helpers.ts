/* eslint-disable deprecation/deprecation */
import { type RawStats } from '@wowfinder/asset-schemas';
import { StatsBlock } from '../Creature';
import Race from '../Creature/Race';
import { type SimpleBonus } from '../Bonus';

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

export { /** @deprecated */ buildStats };
