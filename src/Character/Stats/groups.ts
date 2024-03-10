import { Stat, StatGroup, MentalStat, PhysicalStat } from '@wowfinder/ts-enums';

const statGroups = {
    [StatGroup.physical]: Object.keys(PhysicalStat),
    [StatGroup.mental]: Object.keys(MentalStat),
};

function inGroup(stat: Stat, group: StatGroup): boolean {
    return statGroups[group].includes(stat);
}

export { statGroups, inGroup };
