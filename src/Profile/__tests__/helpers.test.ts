import { Stat } from '@wowfinder/ts-enums';
import { addStats } from '../helpers';
import { StatsBonus } from '../../Bonus';

describe('addStats', () => {
    it('should add stats bonuses to a StatsProfile', () => {
        const baseStats = {
            [Stat.strength]: 10,
            [Stat.dexterity]: 12,
            [Stat.constitution]: 14,
            [Stat.intelligence]: 16,
            [Stat.wisdom]: 18,
            [Stat.charisma]: 20,
        };

        const statBonus1 = new StatsBonus({
            [Stat.strength]: 2,
            [Stat.dexterity]: 3,
        });

        const statBonus2 = new StatsBonus({
            [Stat.constitution]: 4,
            [Stat.intelligence]: 5,
        });

        const newStatsProfile = addStats(baseStats, statBonus1, statBonus2);

        expect(newStatsProfile.strength).toBe(12);
        expect(newStatsProfile.dexterity).toBe(15);
        expect(newStatsProfile.constitution).toBe(18);
        expect(newStatsProfile.intelligence).toBe(21);
        expect(newStatsProfile.wisdom).toBe(18);
        expect(newStatsProfile.charisma).toBe(20);
    });
});
