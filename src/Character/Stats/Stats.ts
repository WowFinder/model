import { Mass } from '../../Scalar';
import { StatsBase } from './StatsBase';
import {
    StatSet,
    PartialStatBlock,
    addStatSets,
    statMod,
    carry,
} from './helpers';

class Stats extends StatsBase {
    get active(): StatSet {
        return addStatSets(this.base, this.racial, this.enhance);
    }

    get totalMods(): StatSet {
        const totals = this.totals;
        return {
            strength: statMod(totals.strength),
            dexterity: statMod(totals.dexterity),
            constitution: statMod(totals.constitution),
            intelligence: statMod(totals.intelligence),
            wisdom: statMod(totals.wisdom),
            charisma: statMod(totals.charisma),
        };
    }

    get carry(): Mass {
        return carry(this.totals.strength);
    }

    updated({
        base,
        racial,
        enhance,
        gear,
        misc,
        temp,
    }: PartialStatBlock): Stats {
        return new Stats({
            base: base || this.base,
            racial: racial || this.racial,
            enhance: enhance || this.enhance,
            gear: gear || this.gear,
            misc: misc || this.misc,
            temp: temp || this.temp,
        });
    }
}

export { Stats };
