import { StatsBonus } from '../Bonus';
import { StatsProfile } from './raw';

function addStats(base: StatsProfile, ...bonuses: StatsBonus[]): StatsProfile {
    const totalBonuses = StatsBonus.sum(...bonuses);
    const stats = { ...base };
    Object.entries(totalBonuses).forEach(([key, value]) => {
        if (!(key in stats)) {
            throw new Error(`Invalid stat key: ${key}`);
        }
        stats[key as keyof StatsProfile] += value;
    });
    return stats;
}

export { addStats };
