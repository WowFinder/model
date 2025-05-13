import { Stat } from '@wowfinder/ts-enums';
import { StatsBonus } from '../Bonus';
import { StatsProfile } from './raw';

function addStats(base: StatsProfile, ...bonuses: StatsBonus[]): StatsProfile {
    const totalBonuses = StatsBonus.sum(...bonuses);
    const stats = { ...base };
    Object.keys(Stat).forEach(key => {
        const k = key as keyof StatsProfile;
        stats[k] += totalBonuses[k];
    });
    return stats;
}

export { addStats };
