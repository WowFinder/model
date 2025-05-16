import { Stat } from '@wowfinder/ts-enums';
import { StatsBonus } from '../../../Bonus';

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

const combinedStats = {
    [Stat.strength]: 12,
    [Stat.dexterity]: 15,
    [Stat.constitution]: 18,
    [Stat.intelligence]: 21,
    [Stat.wisdom]: 18,
    [Stat.charisma]: 20,
};

export { baseStats, statBonus1, statBonus2, combinedStats };
