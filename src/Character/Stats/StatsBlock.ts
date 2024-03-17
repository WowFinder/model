import { Mass } from '../../Scalar';
import { StatsBlockBase } from './StatsBase';
import { Stats as StatValues } from '@wowfinder/asset-schemas';
import { PartialStatBlock, addStatSets, statMod, carry } from './helpers';

class StatsBlock extends StatsBlockBase {
    get active(): StatValues {
        return addStatSets(this.base, this.racial, this.enhance);
    }

    get totalMods(): StatValues {
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
    }: PartialStatBlock): StatsBlock {
        return new StatsBlock({
            base: base || this.base,
            racial: racial || this.racial,
            enhance: enhance || this.enhance,
            gear: gear || this.gear,
            misc: misc || this.misc,
            temp: temp || this.temp,
        });
    }
}

export { StatsBlock };
